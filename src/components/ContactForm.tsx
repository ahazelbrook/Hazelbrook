/**
 * Contact — the centrepiece.
 *
 * Kept deliberately short. The brand's own promise is that "a short note is
 * enough to start", so the form asks for five things and no more: no budget
 * bands, no timeline pickers, no "how did you hear about us". A consultancy
 * that qualifies leads with a dropdown does not read as independent counsel.
 *
 * Submission posts JSON to FORM_ENDPOINT (Formspree and its equivalents all
 * accept this shape). Until that endpoint is configured the form stays in
 * preview mode — it validates and shows the success state, but tells you
 * plainly that nothing was sent, so a missing endpoint can never look like a
 * delivered enquiry.
 */

import { useId, useState } from 'react';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import { Grid } from '@astryxdesign/core/Grid';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { TextInput } from '@astryxdesign/core/TextInput';
import { TextArea } from '@astryxdesign/core/TextArea';
import { Selector } from '@astryxdesign/core/Selector';
import { Banner } from '@astryxdesign/core/Banner';
import { Link } from '@astryxdesign/core/Link';
import {
  ENQUIRY_TYPES,
  FORM_ENDPOINT,
  contact,
  contactSection,
  isFormConfigured,
} from '../content';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'preview' }
  | { kind: 'failed'; message: string };

/** Deliberately permissive: shape only, so we never reject a valid address. */
const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function ContactForm() {
  const formId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [enquiry, setEnquiry] = useState('');
  const [message, setMessage] = useState('');
  const [hasAttempted, setHasAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const errors = {
    name: !name.trim() ? 'Please tell us your name' : undefined,
    email: !email.trim()
      ? 'We need an address to reply to'
      : !looksLikeEmail(email)
        ? 'That does not look like an email address'
        : undefined,
    message: !message.trim() ? 'A sentence or two is enough' : undefined,
  };
  const isValid = !errors.name && !errors.email && !errors.message;

  /** Only surface errors once the visitor has tried to send. */
  const shown = hasAttempted ? errors : { name: undefined, email: undefined, message: undefined };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttempted(true);
    if (!isValid) return;

    if (!isFormConfigured()) {
      setStatus({ kind: 'preview' });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          organisation,
          enquiry: enquiry || 'Not specified',
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`The form service replied ${response.status}.`);
      }

      setStatus({ kind: 'sent' });
      setName('');
      setEmail('');
      setOrganisation('');
      setEnquiry('');
      setMessage('');
      setHasAttempted(false);
    } catch (error) {
      setStatus({
        kind: 'failed',
        message: error instanceof Error ? error.message : 'The message could not be sent.',
      });
    }
  };

  return (
    <section className="hb-section" id="contact">
      <div className="hb-container">
        {/* minWidth stays under ~340 so a single column still fits inside the
            container's content box on a 390px phone — a larger minimum forces
            the column wider than the viewport and pushes the page sideways. */}
        <Grid columns={{ minWidth: 320 }} gap={8} align="start" width="100%">
          {/* Left — the invitation and the direct details. */}
          <VStack gap={6}>
            <VStack gap={5}>
              <p className="hb-label">{contactSection.label}</p>
              <h2 className="hb-display hb-display--l">{contactSection.heading}</h2>
              <p className="hb-standfirst">{contactSection.standfirst}</p>
            </VStack>

            <hr className="hb-rule" />

            <VStack gap={4}>
              <VStack gap={2}>
                <p className="hb-label">Direct</p>
                <Link href={`mailto:${contact.email}`} isStandalone>
                  {contact.email}
                </Link>
                <Link href={`tel:${contact.telephone.replace(/\s/g, '')}`} isStandalone>
                  {contact.telephone}
                </Link>
              </VStack>

              <VStack gap={2}>
                <p className="hb-label">London</p>
                <VStack gap={0}>
                  {contact.address.map(line => (
                    <Text key={line} type="body" as="p" color="secondary">
                      {line}
                    </Text>
                  ))}
                </VStack>
              </VStack>
            </VStack>
          </VStack>

          {/* Right — the form. */}
          <form onSubmit={handleSubmit} noValidate aria-labelledby={`${formId}-heading`}>
            <VStack gap={5}>
              <Text type="label" color="secondary" as="p" id={`${formId}-heading`}>
                Send a note
              </Text>

              {status.kind === 'sent' && (
                <Banner
                  status="success"
                  title="Thank you — your note is with us."
                  description="We reply to every enquiry ourselves, usually within two working days."
                />
              )}

              {status.kind === 'preview' && (
                <Banner
                  status="warning"
                  title="Preview only — nothing was sent."
                  description="This form has no endpoint configured yet. Set FORM_ENDPOINT in src/content.ts to start receiving enquiries."
                />
              )}

              {status.kind === 'failed' && (
                <Banner
                  status="error"
                  title="The message could not be sent."
                  description={`${status.message} Please email ${contact.email} directly.`}
                />
              )}

              <TextInput
                label="Name"
                placeholder="Your name"
                value={name}
                onChange={setName}
                isRequired
                status={shown.name ? { type: 'error', message: shown.name } : undefined}
              />

              <TextInput
                label="Email"
                type="email"
                placeholder="you@organisation.com"
                value={email}
                onChange={setEmail}
                isRequired
                status={shown.email ? { type: 'error', message: shown.email } : undefined}
              />

              <TextInput
                label="Organisation"
                placeholder="Optional"
                value={organisation}
                onChange={setOrganisation}
              />

              <Selector
                label="What is this about?"
                placeholder="Choose one"
                options={[...ENQUIRY_TYPES]}
                value={enquiry}
                onChange={setEnquiry}
              />

              <TextArea
                label="Your note"
                placeholder="What are you building, and where has it got to?"
                value={message}
                onChange={setMessage}
                rows={5}
                isRequired
                status={shown.message ? { type: 'error', message: shown.message } : undefined}
              />

              <HStack gap={4} vAlign="center" wrap="wrap">
                <Button
                  label={status.kind === 'sending' ? 'Sending…' : 'Send note'}
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={status.kind === 'sending'}
                />
                <Text type="supporting" color="secondary">
                  We use your details to reply, and for nothing else.
                </Text>
              </HStack>
            </VStack>
          </form>
        </Grid>
      </div>
    </section>
  );
}
