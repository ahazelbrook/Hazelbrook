# Putting the site behind Cloudflare Zero Trust

How to stand up a Cloudflare Access application in front of this site, why the
two things that went wrong went wrong, and how to prove the protection is
actually on rather than apparently on.

Status: written against the Cloudflare dashboard as of July 2026. Cloudflare
renamed most of these screens during 2025–26 — the paths below are the current
ones. Sources are listed in §8.

---

## 1 · You have two unrelated problems

They arrived together, which makes them look like one problem. They are not.

**The 525** is a TLS failure between Cloudflare and your origin server. It has
nothing to do with Zero Trust, and no amount of Access configuration will move
it. It is §7 of this document.

**The "no protection"** is an Access application that exists but is not in the
path of the request you are testing. This is the more important of the two,
because it fails *silently* — the site loads, nothing errors, and there is no
indication anywhere that the policy you wrote is being consulted by nobody.

The Worker is a wrong turn, and §3 says why.

---

## 2 · The mental model

Cloudflare Access is not software you install and not a proxy you point at
something. It is a check the Cloudflare edge runs on requests **to a specific
hostname**, before those requests reach whatever serves the site.

Three things must all be true, or there is no protection:

1. The hostname belongs to an **active zone** on your Cloudflare account.
2. Traffic for that hostname **actually passes through Cloudflare's proxy** —
   an orange-cloud DNS record, a Pages custom domain, or a Worker custom
   domain. A grey-cloud (DNS-only) record resolves straight to your origin and
   Cloudflare never sees the request.
3. An **Access application** exists whose domain matches the hostname you type
   in the browser, and that application has an **Allow** policy on it.

Miss any one and you get exactly what you saw: a working site, no login prompt,
no error, no log entry. Nothing tells you. That silence is the whole trap.

The commonest version of the miss is #3 and it is subtler than it sounds: an
application created for `example.com` does not cover `www.example.com`, and
neither of them covers `your-project.pages.dev`. Those are three hostnames.
Each needs to be on an application, or each is a side door.

---

## 3 · The Worker was a wrong turn — take it out

A Worker is not an authentication layer, and putting one in front of the site
does not cause Access to engage. Access engages because an application exists
for the hostname; that is the only reason it ever engages.

Worse, a Worker can actively break Access. Cloudflare documents this: if a
Worker route sits on your application's login path, the Worker can overwrite or
strip the `cf-authorization` cookie that Access sets, and the login loop never
completes. If your Worker touches `Set-Cookie` at all, it is a live suspect.

So: unless the Worker is genuinely *serving* the site — Workers Static Assets,
which this project could reasonably move to — delete it, or unbind its route.
Then do §5. If the Worker is serving the site, keep it, but understand that it
is the origin in this picture, not the guard. A Worker on a Custom Domain is
treated as an origin, which is precisely why Access can sit in front of it.

---

## 4 · Work out which hostnames you are protecting

Before touching the Zero Trust dashboard, write down every hostname that serves
this site. Then find your row.

| How the site is served | What protects it | The trap |
|---|---|---|
| **External origin** (VPS, shared host, another CDN) | A proxied DNS record in the zone, plus an Access application on that hostname | A grey-cloud record. Also the cause of your 525 — see §7 |
| **Cloudflare Pages** | An Access application you create **by hand** in Zero Trust | The Pages toggle. See below — this is almost certainly your answer |
| **Workers Static Assets** | *Domains & Routes → Enable Cloudflare Access* covers `workers.dev` and preview URLs. The production custom domain needs its own application | Assuming the one-click toggle covered production. It did not |

### The Pages toggle does not do what its name says

In Pages, *Settings → General → Enable access policy* protects **preview
deployments only** — the randomly generated `373f31e2.your-site.pages.dev`
links. It does **not** protect your `*.pages.dev` domain and it does **not**
protect your custom domain.

If you flipped that toggle and concluded the site was protected, that is the
whole bug, and the fix is §5. Cloudflare lists this under Pages *Known issues*,
not under anything you would ever search for.

Two more consequences of the same known issue:

- If you protect `*.pages.dev` without also creating an application for the
  custom domain, an Access login screen will **render on the custom domain but
  not work**. Broken, rather than open — a different bad outcome, equally
  confusing.
- You cannot add a custom domain to a Pages project when Access is already
  enabled on that domain. Order matters: attach the domain first, protect it
  second.

---

## 5 · The setup

### 5.1 Give yourself a way to log in

Zero Trust → **Integrations → Identity providers**.

For new accounts, Cloudflare's own identity provider is now the default and you
may already have one. For a practice this size you do not need Okta or Entra —
add **One-time PIN** and Access will email a code to any address your policy
allows. It expires ten minutes after the request.

You can run OTP and a real IdP side by side and let people choose.

### 5.2 Create the application

Zero Trust → **Access controls → Applications → Create new application →
Self-hosted and private**.

Then **Add public hostname**, and pick the domain from the dropdown. The
dropdown is populated from zones on your account — if your domain is not in it,
precondition #1 in §2 is not met and nothing below will work.

**Add every hostname that serves the same site to this one application.** A
self-hosted application can hold multiple domains, and that is what you want:
one policy, one session, every door. For this site that is likely `example.com`,
`www.example.com`, and any `*.pages.dev` or `*.workers.dev` name still live.

Wildcards are allowed (`*` matches one subdomain level). One caveat: a
wildcarded subdomain cannot receive a preemptive cookie, because Access does not
know which concrete subdomain to send the user to. Prefer listing hostnames
explicitly where you can.

### 5.3 Write the policy

Action **Allow**. Selector *Emails* or *Emails ending in*, with the addresses
that should get in.

Two rules about policy actions:

- **Never use Bypass** as your access mechanism. Bypass disables all Access
  controls for matching traffic *and stops logging it*. It is for narrowly
  scoped exceptions, and a Bypass rule sitting on your application is another
  way to get exactly the "no protection" symptom you described.
- Evaluation order is **Service Auth → Bypass → Allow/Block**, and the first
  Allow or Block that matches ends evaluation. Nothing below it can override.
  So a broad Allow near the top quietly neuters everything under it.

### 5.4 Session

Set the session duration deliberately. The default is longer than most people
assume, and a long session is the difference between "protected" and "protected
for people who have not logged in this month."

Save.

---

## 6 · Prove it is actually on

Do not skip this. Silent failure is the entire failure mode here.

1. **Open a private window** and visit each hostname on your list. You should
   land on the Access login page, not the site. Test the `pages.dev` and
   `workers.dev` names too — a normal window will have a valid session cookie
   and will show you the site whether or not the policy exists.
2. **Zero Trust → Logs → Access.** Every decision should appear here. If your
   request produced no log line, Access never saw it, and you are back at §2.
3. **The real proof: turn on Require Access protection.** Cloudflare shipped
   deny-by-default for zones in January 2026. With it on, any hostname in the
   account *without* a matching Access application is blocked outright with
   **Error 1050 — blocked by this account's Default-Deny policy**.

   This converts your silent failure into a loud one. Turn it on and reload: if
   the site still serves, an application genuinely covers that hostname. If you
   get 1050, it never did — no matter what the Applications list appeared to
   say. Exempt only hostnames that are deliberately public.

**One debugging gotcha while you test.** If you request a one-time PIN for an
email address that no Allow policy matches, the login page will still say the
code was sent — and no email will arrive. That is deliberate, to stop people
enumerating valid accounts. It is not a mail delivery problem. Check the policy.

---

## 7 · Now the 525, separately

Error 525 means the TLS handshake between Cloudflare and your origin failed. It
only occurs in **Full** or **Full (strict)** encryption mode, because those are
the modes where Cloudflare opens an HTTPS connection to the origin at all.

Usual causes at the origin:

- no valid certificate installed
- port 443 closed
- no SNI support
- cipher suites that do not overlap with Cloudflare's

**Fix it properly.** Issue a **Cloudflare Origin CA certificate**, install it on
the origin, and set the mode to **Full (strict)**. Origin CA certificates are
valid up to fifteen years and are trusted by Cloudflare specifically for this.

**Do not fix it by switching to Flexible.** That is the advice the search
results will give you, and it "works" by not encrypting the Cloudflare→origin
leg at all. Cloudflare's own guidance is to use Full or Full (strict) for
anything carrying a login — which, once Access is in front of it, is this site.
Flexible also breaks in its own ways once the origin starts redirecting to
HTTPS.

**Or make the origin go away.** This repo builds to a static `dist/` with no
server-side component. On Cloudflare Pages or Workers Static Assets there is no
origin server to hand off to, so 525 cannot occur, and Access sits directly in
front of the assets. Given where you already are, that is the shorter road.

---

## 8 · Things that silently break it — the checklist

Run this whenever protection seems to have stopped working.

- [ ] A Worker or Worker route on the login path, stripping `cf-authorization`
- [ ] A **Bypass** policy on the application
- [ ] A broad Allow above a narrow one — first match wins, evaluation stops
- [ ] Application on the apex while you browse `www`, or the reverse
- [ ] `*.pages.dev` or `*.workers.dev` still live and not on any application
- [ ] Pages preview toggle mistaken for real protection (§4)
- [ ] A grey-cloud (DNS-only) record — Cloudflare never sees the request
- [ ] A wildcard subdomain application, which cannot issue preemptive cookies
- [ ] Session duration long enough that you are testing a stale cookie

---

## 9 · Sources

- [Publish a self-hosted application to the Internet](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)
- [Add web applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/)
- [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) · [Manage Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) · [Application paths](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/)
- [Troubleshoot Access](https://developers.cloudflare.com/cloudflare-one/access-controls/troubleshooting/) — the `cf-authorization` / Worker route interaction, and the OTP anti-enumeration behaviour
- [Require Access protection](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/require-access-protection/) · [Require Access protection for zones (changelog, Jan 2026)](https://developers.cloudflare.com/changelog/post/2026-01-22-deny-by-default-for-zones/)
- [One-time PIN login](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) · [Identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) · [Cloudflare IdP is now the default for new accounts (changelog, Jun 2026)](https://developers.cloudflare.com/changelog/post/2026-06-18-cloudflare-idp-default/)
- [Session management](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/)
- [Pages — Preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) · [Pages — Known issues](https://developers.cloudflare.com/pages/platform/known-issues/) · [Pages — Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Workers — Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) · [Workers — workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) · [One-click Access protection for Workers (changelog, Dec 2025)](https://developers.cloudflare.com/changelog/post/2025-12-03-reusable-access-policies/)
- [Error 525](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-525/) · [SSL/TLS encryption modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) · [Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) · [Flexible](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/) · [Cloudflare Origin CA](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)
- [Proxy status](https://developers.cloudflare.com/dns/proxy-status/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) · [React + Vite on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/)
