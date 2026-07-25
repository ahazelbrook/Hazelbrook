---
title: "What kills a BCR at assurance"
description: "The assumptions that fail an assurance review, in the order they fail, and why a weak base case rather than a weak option is what usually kills a case."
slug: "what-kills-a-bcr-at-assurance"
date: "2026-07-25"
standfirst: "Business cases rarely fail on arithmetic — they fail on a counterfactual nobody stress-tested, a forecast nobody interrogated, and an option set that was never a real choice."
---

Business cases do not usually fail an assurance review on arithmetic. They fail, in roughly this order, on: a base case that quietly assumes the world stands still; a demand forecast that has been accepted rather than interrogated; an option shortlist that is the preferred option in three sizes; a discount rate treated as one number instead of a range; a residual value doing more work at the boundary than anyone intended; and a benefit–cost ratio presented as the answer rather than as one line of it.

What follows is what a reviewer actually does with each of those, and why the first one on the list is the one that ends cases.

## The base case is where most cases die

A benefit in a cost–benefit analysis is not a thing the project produces. It is the difference between two futures.

> Only one of those two futures gets the modelling budget, the design, the risk workshop and the review. The other one gets a paragraph.

That asymmetry is the whole problem. The base case has no owner. The option has a sponsor, the cost estimate has a quantity surveyor, the demand model has a modeller with a name on the report. The counterfactual is usually written last, by whoever is assembling the chapter, and it is the only input where being wrong in the direction of the project does not look like advocacy. It looks like housekeeping.

There are two directions of error. The first, and by far the more common, is a base case that is too thin. Australian guidance is consistent that the counterfactual is a *do-minimum*, not a do-nothing: continued routine and periodic maintenance, asset renewal and like-for-like replacement of life-ending components, and any projects that are already committed and funded. Strip those out and the case starts manufacturing benefits. Leave a committed project out of the base case and its benefits are counted twice — once in its own business case, and once in yours.

The second is a base case that has been over-specified in the other direction, where a "planning reference case" is assumed to happen anyway even though nothing would fund it. That understates the project, and it is rarer, but it fails scrutiny just as hard because it is equally unevidenced.

This is not an obscure concern. Infrastructure Australia's own commissioned [2022 review of its cost–benefit analysis methodology](https://www.infrastructureaustralia.gov.au/sites/default/files/2022-03/2022%20CBA%20methodology%20review.pdf) recommended revising the base case definition toward a business-as-usual framing, on the grounds that the existing wording could be read as permitting a committed-and-funded approach in situations where a planning reference case was the right answer. When the agency that assesses the cases asks for its own base case guidance to be tightened, the failure mode is structural rather than local.

The reason a weak base case is fatal where a weak option is merely expensive is timing. A weak option can be fixed inside the case — add an option, re-run it, re-present. Reopening the base case reopens every benefit line in the model, because every benefit was measured against it. Query it at gate and the honest remedy is a re-run, not an amendment, and a re-run is a schedule the sponsor no longer has.

**What a reviewer looks for.** The capital and maintenance profile in the base case, line by line, and whether it is evidenced or asserted. Whether any committed and funded project appears in both the base case and the option. Whether assets are assumed to degrade, and on what evidence. Whether the same population, land use and demand assumptions have been applied to both futures — a base case built on last year's inputs against an option built on this year's will produce a benefit that is entirely an artefact of the mismatch.

## Is the demand forecast evidence, or the answer working backwards?

Demand sits underneath almost every benefit line. Travel time savings, vehicle operating costs, reliability, safety, the wider economic benefits — all of them are volumetric. Move the forecast and everything above it moves with it, which is why it is the second thing a reviewer opens and the first thing a sponsor defends.

The reason it fails scrutiny is not that forecasting is hard, although it is. It is that the error is systematic and asymmetric rather than random, which tells you the cause sits in the process rather than in the mathematics. We have written about that separately in [why patronage forecasts miss](/journal/why-patronage-forecasts-miss/), and it is worth reading alongside this piece, because a case can be immaculate in every other respect and still be carrying a forecast that will not survive the first year of operation.

**What a reviewer looks for.** The ramp-up profile and what evidence supports it. Whether the land use the forecast assumes is itself committed, or is a rezoning that has not happened. Whether the same forecast drives the economic case and the revenue case — and if not, why two numbers exist. And who produced it, inside what process, with what visibility of the answer the process wanted.

## Two options and a base case is a floor, not a target

Infrastructure Australia's [Assessment Framework](https://www.infrastructureaustralia.gov.au/publications/assessment-framework) recommends — recommends, rather than requires — at least two options plus a base case in a business case. That is a minimum, and a minimum read as a target is how a shortlist becomes the preferred option at three different scopes.

The audit record is blunt about how common this is. The Victorian Auditor-General's 2022 report on the [quality of major transport infrastructure project business cases](https://www.audit.vic.gov.au/report/quality-major-transport-infrastructure-project-business-cases) found that three of the four business cases examined lacked sufficient analysis of alternative options, two lacked an assessment of value for money under different scenarios, and three of four did not support fully informed investment decisions. It also found that three were not finalised until after significant financial commitments had already been made.

That last finding is the one worth sitting with, because it explains the first. A thin option set is very often a sequencing symptom rather than an analytical failure. If the commitment precedes the case, there is no genuine alternative left to analyse, and every reviewer recognises the shape of a shortlist assembled after the fact. Nobody involved is being dishonest. They are being asked to evidence a decision rather than inform one, which is a different job with the same deliverable.

**What a reviewer looks for.** Whether the shortlist contains a real non-capital option — pricing, demand management, an operational change — or only capital at three price points. The recorded reason the long list was cut, and whether the criteria that cut it were set before or after the options were known. And whether any cheaper option that solves the stated problem was dropped on evidence or on a decision already taken.

## A discount rate is a convention. The appraisal period is a choice.

The Commonwealth convention is a 7% real central rate, with results also presented at 4% and 10% so the sensitivity is visible in the summary rather than buried. That is the position in Infrastructure Australia's [Guide to economic appraisal](https://www.infrastructureaustralia.gov.au/sites/default/files/2021-07/Assessment%20Framework%202021%20Guide%20to%20economic%20appraisal.pdf) and in the [ATAP cost–benefit analysis guidance](https://www.atap.gov.au/sites/default/files/documents/ATAP-T2-CBA-FINAL-2022-04-26.pdf).

It is not the only convention in the country. NSW Treasury's [TPG23-08 Guide to Cost-Benefit Analysis](https://www.nsw.gov.au/departments-and-agencies/nsw-treasury/documents-library/tpg23-08) sets a central real rate of 5%, with sensitivities at 3% and 7%. Two consequences follow, and both are routinely missed. A BCR is not portable between jurisdictions, so putting one project's ratio next to another's without naming the convention that produced each is not a comparison. And a case whose recommendation changes between its own sensitivity bookends is not necessarily wrong — but it has become a case about the discount rate, and that belongs in the narrative rather than in an appendix table.

**What a reviewer looks for.** The switching value. Not the BCR at 7%, but the rate at which the BCR reaches 1.0, and how far that sits from the central rate. The same question applied to demand and to capital cost. A case that states its own switching values has done the reviewer's work and is nearly always the stronger case for having done it.

## What happens at the end of the appraisal period?

ATAP sets the appraisal period at the expected life of the asset in its intended use plus construction — conventionally around 30 years for road initiatives and 50 for rail. Where a jurisdiction caps the period below the life of the asset, typically at 30 years, a residual value is added to account for the net benefits that fall beyond the boundary.

Residual value is legitimate and necessary. It fails scrutiny when it is doing real work. It is commonly derived by straight-line depreciation against remaining service life, which makes it a bookkeeping construct rather than a demand-based benefit — and a case being carried across the line by a depreciated capital figure landing in year 30 is a case about accounting policy.

**What a reviewer looks for.** Residual value as a percentage of the present value of total benefits, and the BCR re-run with it removed. If the ratio crosses 1.0 when it comes out, that is a finding, and it is better found by you than at gate.

## The BCR is one line of the assessment, not the assessment

Infrastructure Australia's 2021 framework asks proponents to demonstrate merit using quantitative *and* qualitative evidence against its assessment criteria, with the economic appraisal sitting inside an integrated view rather than standing in for it. The BCR is an input to a judgement. It is not the judgement.

Where a case treats it as a score to be maximised, a familiar set of behaviours follows. Benefits that resist monetisation drift out of the analysis and into the strategic chapter, where they carry no weight. Costs migrate to enabling works just outside the assessment boundary. Sensitivity ranges narrow. None of that requires anyone to act in bad faith; it is simply what optimising a single number looks like from the inside, and it is legible to a reviewer from the outside within about an hour. A BCR of 1.1 that has survived its own sensitivity tests is a stronger case than a 2.4 that has never been asked to.

## What a reviewer looks at first

In order, and before the model is opened at all:

1. **The base case** — its capital and maintenance profile, and whether anything committed and funded sits in both futures.
2. **The demand forecast** — where it came from, and whether the economic case and the revenue case are running the same one.
3. **The option shortlist** — and the recorded reason the long list was cut to it.
4. **The switching values** — the discount rate, demand and cost at which the BCR reaches 1.0.
5. **Residual value** — as a share of the present value of benefits, and the result without it.

None of this is about catching anyone out. Every item on that list is something the team writing the case can test on itself, weeks before anyone else does, and most of them take an afternoon. The cases that survive assurance are rarely the ones with the highest ratio. They are the ones where somebody asked these questions early enough that the answers could still change the case.

That work — [business case, appraisal and independent review](/#services) of a case someone else has built — is what we do.
