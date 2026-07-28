# Putting this site online, privately

Step-by-step instructions for hosting this website on Cloudflare so that
**only people you name by email address can see it.** Everyone else gets a
login screen they cannot get past.

No coding. Everything below is done by clicking in the Cloudflare website,
except two short commands right at the start.

Allow about 45 minutes the first time. If you get stuck, the technical
reference is [`docs/cloudflare-zero-trust.md`](docs/cloudflare-zero-trust.md).

---

## What you are building

```
   You type your domain into a browser
                 ↓
   Cloudflare asks: who are you?          ← the lock
                 ↓
   You get an email with a 6-digit code
                 ↓
   The site loads
```

Anyone who is not on your list gets stopped at the second step. They never
reach the site at all — it is not "hidden", it is genuinely unreachable to
them.

---

## Before you start

You need three things:

1. **A Cloudflare account** — free plan is fine. [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Your domain added to Cloudflare.** In Cloudflare, this is called a
   "zone". If you have been getting 525 errors, you already have this and can
   skip it. If not: in Cloudflare choose **Add a domain**, follow the prompts,
   and change your nameservers at the company you bought the domain from.
   Cloudflare emails you when it is active. This can take a few hours.
3. **This repository on GitHub** — you already have it.

---

## Part 0 · Clear out the old attempt

You said you are happy to start again. Do this first — leftovers from the
earlier attempt are what made the last setup behave strangely, and they will
do it again if you leave them.

In the Cloudflare dashboard:

1. **Compute → Workers & Pages.** Delete any Worker you made earlier. Click
   it, then **Settings → Delete**.
2. **Your domain → DNS → Records.** Look for records named `@`, `www`, or
   your domain name, of type **A**, **AAAA** or **CNAME**. If they point at an
   old web host you are no longer using, delete them. *If you are unsure, take
   a screenshot first so you can put them back.* Leave MX records alone —
   those are your email, and deleting them stops your email working.
3. **Zero Trust → Access controls → Applications.** Delete any application you
   created earlier.

Now you have a clean slate.

---

## Part 1 · Put the site on Cloudflare

Cloudflare will connect to GitHub and rebuild the site automatically every
time you change it.

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com).
2. In the left menu: **Compute → Workers & Pages**.
3. Click **Create**, then choose **Import a repository**.
4. Connect your GitHub account when asked, and give Cloudflare permission to
   see the **Hazelbrook** repository. You can grant access to just this one
   repository rather than all of them.
5. Select the **Hazelbrook** repository.
6. Cloudflare will show build settings. Check these three, and correct them if
   they differ:

   | Setting | Value |
   |---|---|
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Root directory | leave blank (or `/`) |

7. Click **Create and deploy**.

Wait two or three minutes. You will see a log scrolling past. When it finishes
you should see a success message.

> **You will not be given a link to click, and that is correct.** Normally
> Cloudflare hands you a free public address ending in `.workers.dev`. This
> repository deliberately switches that off, because that address would show
> your site to anyone who found it, and the lock you are about to set up
> **cannot** be applied to it. The site is not visible to anyone yet. That is
> the point.

---

## Part 2 · Point your domain at it

1. Still in **Compute → Workers & Pages**, click your new **hazelbrook**
   Worker.
2. Go to **Settings → Domains & Routes**.
3. Click **Add**, then choose **Custom domain**.
4. Type the address you want the site to live at — for example
   `hazelbrook.com.au`, or `www.hazelbrook.com.au`.
5. Click **Add domain**.

Cloudflare sets up the certificate and DNS for you. Give it a minute or two.

**Do this for both** the plain domain and the `www.` version if you want both
to work. Each one is a separate door, and in Part 3 you must lock every door
you open here. Write down every address you add — you will need the list.

> **Choose "Custom domain", not "Route".** They look similar and they are not.
> A Custom domain means Cloudflare serves this site and nothing else is
> involved. A Route leaves your old web host in the picture behind the scenes,
> and that is where your 525 errors were coming from.

At this point the site is live at your domain and **anyone can see it.** That
is fixed in the next part, so do not stop here.

---

## Part 3 · Set up how you log in

You only do this once, ever.

1. In the left menu of the Cloudflare dashboard, click **Zero Trust**.
2. First time only: it asks you to choose a team name and pick a plan. Choose
   the **Free** plan — it covers up to 50 people. You may be asked for a card;
   you are not charged on the free plan.
3. Go to **Integrations → Identity providers**.
4. Click **Add new**, and choose **One-time PIN**.
5. Save.

That is the simplest option and needs no other accounts. When you visit the
site, you type your email address, Cloudflare emails you a code, you type the
code in. The code lasts 10 minutes.

---

## Part 4 · Lock the site

1. In **Zero Trust**, go to **Access controls → Applications**.
2. Click **Create new application**.
3. Choose **Self-hosted and private**.
4. Give it a name — `Hazelbrook website` is fine.
5. Click **Add public hostname**. Choose your domain from the dropdown list.
6. **Add every address from Part 2 to this same application** — the plain
   domain and the `www.` version. Click **Add public hostname** again for each
   one. Do not create separate applications; one application covering all of
   them is what you want.
7. Continue to the policy step. Create a policy:
   - **Action:** `Allow`
   - **Selector:** `Emails`
   - **Value:** your email address. Click add for each extra person you want
     to let in.
8. Click **Save** / **Create**.

> **Never choose the action "Bypass".** It sounds like it means "skip the
> login for me". It actually means "let everybody in, and keep no record of
> it". It is the single easiest way to leave the site wide open while
> believing it is locked.

---

## Part 5 · Check that it actually worked

**Do not skip this.** When this setup fails, it fails silently — the site
loads normally and nothing anywhere warns you that the lock is not on.

1. Open a **private / incognito window** (Ctrl+Shift+N, or Cmd+Shift+N on a
   Mac). This matters: your normal window remembers you are logged in and will
   show you the site whether or not the lock exists.
2. Go to your domain.
3. **You should see a Cloudflare login screen, not your website.**
4. Type your email, get the code, type it in. Now the site loads.
5. Repeat for the `www.` version, and any other address you added in Part 2.

If you see the website immediately without being asked to log in, something in
Part 4 did not take. The most likely cause is that the address you typed is
not one of the hostnames on the application. Go back to Part 4, step 6.

### The stronger test

If you want to be certain, ask someone who is not on your list — a friend, or
your phone with wifi turned off — to open the address. They should get the
login screen and be unable to get past it, even with their own email address.

---

## Everyday use

**To change the website:** edit the files on GitHub, or push a change. Cloudflare
rebuilds and republishes automatically within a few minutes. You do not need to
touch any of the above again.

**To let someone else in:** Zero Trust → Access controls → Applications → your
application → edit the policy → add their email address. They can log in
straight away. No account needed on their side, just an inbox.

**To remove someone:** the same screen, delete their email address.

**When you are ready to go public:** Zero Trust → Applications → delete the
application. The lock comes off and the site is a normal public website. Nothing
else needs changing.

---

## If something goes wrong

| What you see | What it means | What to do |
|---|---|---|
| The site loads with no login | The lock is not covering that exact address | Part 4, step 6 — add that address to the application |
| **525** error | Cloudflare is trying to reach an old web host | Part 0, step 2 — an old DNS record is still there. And check Part 2 said "Custom domain", not "Route" |
| **1050** error | A Cloudflare setting is blocking everything not explicitly allowed | Normal if you turned on "Require Access protection". Make sure your domain is on the application |
| Login screen appears but the code never arrives | Your email address is not on the policy | Part 4, step 7. Cloudflare says "code sent" even when it hasn't sent one — this is deliberate, so strangers cannot find out which addresses are valid |
| Build failed in Part 1 | Usually the build command | Check it says exactly `npm run build` |

For anything else, [`docs/cloudflare-zero-trust.md`](docs/cloudflare-zero-trust.md)
explains the mechanics and links to Cloudflare's own documentation.

---

## One note on the instructions

Cloudflare renames things in its dashboard fairly often — during 2025 and 2026
several of these screens moved. The names above are correct as of July 2026,
but if a button is not where this says, it has probably just been renamed
rather than removed. The order of operations does not change: **put the site
up, attach the domain, add the lock, then test it in a private window.**
