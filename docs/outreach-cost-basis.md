# Outreach proposal operating-cost basis

Reviewed 2026-11-11. Planning assumptions, not measured pipeline performance.

For 3,000 unique properties processed per month:

- Text processing reference: DeepSeek Flash peak uncached rates, $0.30/M input and $1.20/M output tokens. Allow 15M input and 3M billable output tokens across text processing: $4.50 + $3.60 = $8.10.
- Vision budget reference: OpenAI GPT-6.1 Sol standard rates, $2/M input and $10/M output tokens. Model choice is provisional until Phoenix address-matching tests. Use a frontier vision model with selected photos after parcel/attribute filtering, not an image generation model.
- Allow 1,500–3,000 visual passes/month. Each pass budgets 8,000 total billable input tokens (images plus text) and 1,000 total billable output tokens, including reasoning. Cost: $0.016 + $0.010 = $0.026/pass, or $39–78/month.
- Text + vision totals $47.10–86.10. The proposal publishes $47–86, rounded to the dollar, with no added headroom. This is a bounded scenario, not a measured exception rate; image resolution, candidate count, retries and reasoning affect actual usage. If all properties require multiple full passes, or the chosen model costs more, re-estimate from the pilot. No batch/caching discounts assumed.
- Tracerfy Advanced (address-only input): 3,000 successful results × $0.04 = $120. Misses are free. This is not a promise that every property returns usable contact data; if more properties must be processed to reach 3,000 usable leads, AI costs must be recalculated. Credit purchase minimums affect cash outlay separately from consumption.
- Total vendor budget: $47–86 + $120 = $167–206/month. $167/3,000 = $0.0557; $206/3,000 = $0.0687.
- Assumes public county parcel data and Google Geocoding within its available 10,000-event monthly free quota (shared billing-account usage matters). Extra geocoding costs $5/1,000. No paid imagery, external search APIs, proxies or alternative property databases assumed; determine need during validation.
- Existing AirDNA subscription, hosting, taxes and currency conversion are outside this vendor estimate. The removed maintenance/hosting and in/out sections are intentionally absent from the client proposal.
- Initial validation, setup, usage guidance and team training are included in the $1,680 development quote. Training here means helping the team use the delivered system.

Official references checked:

- https://api-docs.deepseek.com/quick_start/pricing/
- https://developers.openai.com/api/docs/pricing
- https://developers.openai.com/api/docs/guides/images-vision
- https://www.tracerfy.com/pricing
- https://developers.google.com/maps/billing-and-pricing/pricing
