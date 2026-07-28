# Putting the site behind Cloudflare Zero Trust

The site is served by a Cloudflare Worker. This is how to put a Cloudflare
Access application in front of it, why the protection appeared to do nothing,
and where the 525 came from.

Status: written against the Cloudflare dashboard as of July 2026. Cloudflare
renamed most of these screens during 2025–26; the paths below are the current
ones. Sources in §9.

---

## 1 · The short diagnosis

**Access is not running late. It runs before your Worker.** In Cloudflare's
request pipeline, Access is an internal phase that executes after Super Bot
Fight Mode and before Bulk Redirects — well ahead of Worker execution. So a
Worker on a Custom Domain or a Route inside your zone *is* covered by Access,
provided an application matches the hostname being requested.

Which means the ordering was never your problem, the Worker was never the fix,
and your application on the custom domain is quite possibly working correctly.
The hole is somewhere else:

**Every Worker is handed a `workers.dev` address the moment it is created.**
`<worker-name>.<your-subdomain>.workers.dev` serves the identical site. It is
not in your zone, so a zone-level Access application **cannot** cover it, and
no amount of configuring that application will. Preview URLs are the same
story. That address is public, it is indexed if anyone links it, and it is
almost certainly what "there is just no protection now" actually means.

**And the 525 is a Route symptom.** A Route leaves your old origin in the
picture; a Custom Domain removes it. §3.

So: two settings and one decision. §3, §4, §5.

---

## 2 · The mental model

Access is not software you install and not a proxy you point at something. It
is a check the Cloudflare edge runs on requests **to a specific hostname**,
before those requests reach whatever serves the site — including before your
Worker runs.

Three things must all be true or there is no protection:

1. The hostname belongs to an **active zone** on your Cloudflare account.
   `*.workers.dev` does not. That is the whole of §4.
2. Traffic for that hostname **passes through Cloudflare's proxy**. For a
   Worker on a Custom Domain this is automatic.
3. An **Access application** exists whose domain matches the hostname you type
   in the browser, with an **Allow** policy on it.

Miss any one and you get exactly what you saw: a working site, no login
prompt, no error, and no log line saying anything was skipped. Nothing tells
you. That silence is the trap.

Precondition #3 is subtler than it reads. An application for `example.com` does
not cover `www.example.com`, and neither covers
`hazelbrook.your-subdomain.workers.dev`. Three hostnames. Each needs to be on
an application, or each is a side door.

---

## 3 · Decide first: Custom Domain or Route

This is the decision that fixes the 525, and most people make it by accident.

| | **Custom Domain** | **Route** |
|---|---|---|
| What the Worker is | The origin | Middleware in front of your origin |
| Your origin server | Gone. Not in the picture | Still there, behind the Worker |
| DNS record | Created for you | You keep whatever is already there |
| Unmatched paths | N/A — the Worker owns the hostname | **Fall through to your origin** |
| Can produce a 525 | No | **Yes** |

Cloudflare's own wording: a Custom Domain is where "the Worker is the origin";
a Route is set "where your origin server, **if you have one**, is behind a
Worker."

**This is where your 525 comes from.** A Route matches a URL pattern. Anything
the pattern does not match is not handled by the Worker — it falls through to
the zone's DNS record, which still points at whatever host you were on before,
which is not presenting a certificate Cloudflare will accept. That is a 525,
and it explains the symptom pair exactly: some requests hit the Worker and
work, others fall through and 525.

Route patterns have a documented sharp edge too: a trailing `/*` may not match
the way you expect, which widens the set of paths that fall through.

**Recommendation: use a Custom Domain.** This site builds to a static `dist/`
with no server-side component, so there is nothing an origin server needs to do
for it. Put the Worker on a Custom Domain, delete the leftover DNS record
pointing at the old host, and the 525 becomes structurally impossible — there
is no origin left to fail a handshake with. Do this before §5; it also
simplifies which hostnames you have to protect.

If you keep the Route, you must separately fix the origin's TLS. §7.

---

## 4 · Close the doors Workers open by themselves

This is the part that was silently undoing your work.

### 4.1 `workers.dev`

All Workers are assigned a `workers.dev` route on creation:
`<worker-name>.<your-subdomain>.workers.dev`. Cloudflare describes that
subdomain as being treated as a free website, intended for hobby projects —
which is a fair description of its security posture, and not what you want
serving a client-facing marketing site.

Your zone-level Access application does not and cannot cover it. Two options:

- **Disable it.** For a production site this is the right answer. Nothing needs
  that URL once a Custom Domain is attached. In Wrangler this is
  `workers_dev = false`.
- **Or protect it.** Dashboard → your Worker → **Settings → Domains & Routes**
  → for `workers.dev`, **Enable Cloudflare Access**. Then *Manage Cloudflare
  Access* to set which email addresses are authorised. Since December 2025 this
  creates a reusable Access policy rather than a duplicated one, and removes it
  again when you disable Access on the Worker.

### 4.2 Preview URLs

Every version gets a preview address on the same `workers.dev` subdomain. Same
exposure, same fix, same screen — **Settings → Domains & Routes → Preview URLs
→ Enable Cloudflare Access**.

Useful default, as of October 2025: **Preview URLs inherit your `workers.dev`
setting** unless you configure them explicitly (`preview_urls = workers_dev`).
So disabling `workers.dev` disables previews too, and one decision closes both
doors.

---

## 5 · Set up the Access application

### 5.1 Give yourself a way to log in

Zero Trust → **Integrations → Identity providers**.

Cloudflare's own identity provider is now the default for new accounts, so you
may already have one. For a practice this size you do not need Okta or Entra —
add **One-time PIN** and Access emails a code to any address your policy
allows, expiring ten minutes after the request. You can run OTP and a real IdP
side by side and let people pick.

### 5.2 Create the application

Zero Trust → **Access controls → Applications → Create new application →
Self-hosted and private**.

Then **Add public hostname**, and choose the domain from the dropdown. That
dropdown is populated from zones on your account — if your domain is not in it,
precondition #1 in §2 is not met and nothing below will work.

**Put every hostname that serves this site on this one application.** A
self-hosted application holds multiple domains, which is what you want: one
policy, one session, every door. That means the apex, `www`, and — if you did
not disable them in §4 — the `workers.dev` and preview addresses.

Wildcards work, and `*` matches one subdomain level. One caveat: a wildcarded
subdomain cannot receive a preemptive cookie, because Access does not know
which concrete subdomain to redirect to. List hostnames explicitly where you
can.

### 5.3 Write the policy

Action **Allow**. Selector *Emails* or *Emails ending in*, with the addresses
that should get in.

Two rules about actions:

- **Never use Bypass as your access mechanism.** Bypass disables all Access
  controls for matching traffic *and stops logging it*. It is for narrow,
  deliberate exceptions. A stray Bypass rule produces precisely the "no
  protection" symptom you described.
- Evaluation order is **Service Auth → Bypass → Allow/Block**, and the first
  Allow or Block to match ends evaluation — nothing below can override it. A
  broad Allow near the top quietly neuters everything under it.

### 5.4 Session

Set the session duration deliberately. The default is longer than most people
assume, and a long session is the difference between "protected" and "protected
against people who have not logged in this month."

### 5.5 One thing your Worker must not do

Documented failure mode: if a Worker route sits on the application's login
path, the Worker can overwrite or strip the `cf-authorization` cookie Access
sets, and the login loop never completes. If your Worker touches `Set-Cookie`
at all, it is a suspect. Serving static assets, it should not.

---

## 6 · Prove it is on

Do not skip this. Silent failure is the entire failure mode here.

1. **Private window, every hostname on your list** — apex, `www`, the
   `workers.dev` address, a preview URL. You should land on the Access login
   page, not the site. A normal window carries a valid session cookie and will
   show you the site whether or not a policy exists, which is how this gets
   missed.
2. **Zero Trust → Logs → Access.** Every decision appears here. A request that
   produced no log line was never seen by Access, and you are back at §2.
3. **The real proof: turn on Require Access protection.** Cloudflare shipped
   deny-by-default for zones in January 2026. With it on, any hostname in the
   account *without* a matching Access application is blocked outright with
   **Error 1050 — blocked by this account's Default-Deny policy**.

   That converts the silent failure into a loud one. Turn it on and reload: if
   the site still serves, an application genuinely covers that hostname; if you
   get 1050, it never did, whatever the Applications list appeared to say.
   Exempt only hostnames meant to be public. Note this is zone-scoped and does
   not reach `workers.dev` — §4 is still the fix there.

**A debugging gotcha.** Request a one-time PIN for an address no Allow policy
matches, and the page still says the code was sent — and no email arrives. That
is deliberate, to stop account enumeration. It is not a mail problem. Check the
policy.

---

## 7 · The 525, if you keep the Route

525 means the TLS handshake between Cloudflare and your origin failed. It only
occurs in **Full** or **Full (strict)** mode, because those are the modes where
Cloudflare opens an HTTPS connection to the origin at all. Usual causes: no
valid certificate, port 443 closed, no SNI support, or no overlap between the
origin's cipher suites and Cloudflare's.

Fix it properly: issue a **Cloudflare Origin CA certificate**, install it on the
origin, set the mode to **Full (strict)**. Those certificates are valid up to
fifteen years and are trusted by Cloudflare for exactly this.

**Do not fix it by switching to Flexible.** That is what the search results will
tell you, and it "works" by not encrypting the Cloudflare→origin leg at all.
Cloudflare's guidance is to use Full or Full (strict) for anything carrying a
login — which, once Access is in front of it, is this site.

**Better: make the origin go away.** Move to a Custom Domain per §3, delete the
old DNS record, and there is no origin server to hand off to.

---

## 8 · The checklist

Run this whenever protection seems to have stopped working.

- [ ] `workers.dev` still enabled and unprotected — the automatic side door
- [ ] Preview URLs still enabled and unprotected
- [ ] Worker on a **Route**, with unmatched paths falling through to a dead origin
- [ ] Trailing `/*` in a route pattern not matching what you assumed
- [ ] Application on the apex while you browse `www`, or the reverse
- [ ] A **Bypass** policy on the application
- [ ] A broad Allow above a narrow one — first match wins, evaluation stops
- [ ] A Worker touching `Set-Cookie` on the login path, eating `cf-authorization`
- [ ] A wildcard subdomain application, which cannot issue preemptive cookies
- [ ] Testing in a normal window on a stale session cookie

---

## 9 · Sources

- [Workers — Routes and domains](https://developers.cloudflare.com/workers/configuration/routing/) · [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) · [Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) · [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)
- [Workers — Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/) · [Preview URL default behavior now matches your workers.dev setting (changelog, Oct 2025)](https://developers.cloudflare.com/changelog/post/2025-10-23-preview-url-default-behavior/) · [Preview URLs now default to opt-in (changelog, Sep 2025)](https://developers.cloudflare.com/changelog/post/2025-09-17-update-preview-url-setting/)
- [One-click Cloudflare Access for Workers (changelog, Oct 2025)](https://developers.cloudflare.com/changelog/post/2025-10-03-one-click-access-for-workers/) · [Now creates reusable Access policies (changelog, Dec 2025)](https://developers.cloudflare.com/changelog/post/2025-12-03-reusable-access-policies/)
- [Ruleset Engine — Phases list](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) — where Access sits relative to Workers
- [Publish a self-hosted application to the Internet](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) · [Add web applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/)
- [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) · [Manage Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) · [Application paths](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/)
- [Troubleshoot Access](https://developers.cloudflare.com/cloudflare-one/access-controls/troubleshooting/) — the `cf-authorization` interaction and the OTP anti-enumeration behaviour
- [Require Access protection](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/require-access-protection/) · [Require Access protection for zones (changelog, Jan 2026)](https://developers.cloudflare.com/changelog/post/2026-01-22-deny-by-default-for-zones/)
- [One-time PIN login](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) · [Identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) · [Cloudflare IdP is now the default for new accounts (changelog, Jun 2026)](https://developers.cloudflare.com/changelog/post/2026-06-18-cloudflare-idp-default/)
- [Session management](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/)
- [Error 525](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-525/) · [SSL/TLS encryption modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) · [Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) · [Flexible](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/) · [Cloudflare Origin CA](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) · [React + Vite on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/)
