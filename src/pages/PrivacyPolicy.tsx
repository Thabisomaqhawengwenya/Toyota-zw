import React from 'react';
import { Box, Container, Typography, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ShieldIcon from '@mui/icons-material/Shield';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Box sx={{ mb: 5 }}>
    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#1E1E1E' }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2.5, borderColor: '#F0F0F0' }} />
    {children}
  </Box>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="body2" sx={{ color: '#4A4A4A', lineHeight: 1.9, mb: 2 }}>
    {children}
  </Typography>
);

export const PrivacyPolicy: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '80vh' }}>
      {/* Banner */}
      <Box sx={{ bgcolor: '#1E1E1E', borderBottom: '4px solid #EB0A1E', py: { xs: 7, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'rgba(235,10,30,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldIcon sx={{ color: '#EB0A1E', fontSize: 30 }} />
            </Box>
          </Box>
          <Typography variant="subtitle2" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            LEGAL
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#FFFFFF', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            PRIVACY POLICY
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}>
            Last updated: 1 January 2026 &nbsp;·&nbsp; CFAO Toyota Zimbabwe
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ bgcolor: 'background.paper', border: '1px solid #EAEAEA', p: { xs: 3, md: 6 } }}>

          <P>
            CFAO Toyota Zimbabwe ("we", "us", "our") is committed to protecting the privacy and personal data of all visitors to this website and customers of our dealerships. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information, in accordance with the <strong>Data Protection Act (Chapter 11:12) of Zimbabwe</strong> and applicable international data protection standards.
          </P>

          <Section title="1. Information We Collect">
            <P>We may collect the following categories of personal information when you interact with this website or our dealerships:</P>
            <Stack spacing={1} sx={{ mb: 2, pl: 2 }}>
              {[
                'Identity data — full name, national ID number, date of birth',
                'Contact data — email address, phone number, physical address',
                'Vehicle interest data — preferred models, enquiry details, test drive bookings',
                'Financial data — employment type, income information submitted for finance pre-qualification',
                'Technical data — IP address, browser type, pages visited, time on site (collected via cookies)',
                'Communications data — records of correspondence with our customer care team',
              ].map((item, i) => (
                <Typography key={i} variant="body2" sx={{ color: '#4A4A4A', lineHeight: 1.8, display: 'flex', gap: 1 }}>
                  <Box component="span" sx={{ color: '#EB0A1E', fontWeight: 700, flexShrink: 0 }}>—</Box>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Section>

          <Section title="2. How We Use Your Information">
            <P>We use your personal information for the following purposes:</P>
            <Stack spacing={1} sx={{ mb: 2, pl: 2 }}>
              {[
                'To respond to vehicle enquiries, service booking requests, and test drive applications',
                'To process finance pre-qualification applications and refer them to our banking partners',
                'To communicate promotions, vehicle launches, and service specials (only where you have opted in)',
                'To improve our website content, user experience, and service delivery',
                'To comply with legal and regulatory obligations under Zimbabwean law',
                'To maintain internal records and business administration',
              ].map((item, i) => (
                <Typography key={i} variant="body2" sx={{ color: '#4A4A4A', lineHeight: 1.8, display: 'flex', gap: 1 }}>
                  <Box component="span" sx={{ color: '#EB0A1E', fontWeight: 700, flexShrink: 0 }}>—</Box>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Section>

          <Section title="3. Data Sharing & Third Parties">
            <P>
              We do not sell, rent, or trade your personal data to third parties. We may share your information only in the following limited circumstances:
            </P>
            <P>
              <strong>Banking partners</strong> — When you submit a finance enquiry, your information may be shared with CBZ Bank, ZB Bank, FBC Bank, or Steward Bank solely for the purpose of processing your application, subject to their own privacy policies.
            </P>
            <P>
              <strong>Toyota Motor Corporation</strong> — Anonymised usage data and vehicle preference trends may be shared with Toyota globally for product development and regional planning purposes.
            </P>
            <P>
              <strong>Legal obligations</strong> — We may disclose your information if required by law, court order, or government authority in Zimbabwe or any applicable jurisdiction.
            </P>
          </Section>

          <Section title="4. Data Retention">
            <P>
              We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Enquiry data is retained for up to 3 years. Financial application data is retained for up to 7 years in compliance with financial regulations. Website usage data collected via cookies is retained for up to 12 months.
            </P>
          </Section>

          <Section title="5. Your Rights">
            <P>Under the Data Protection Act (Chapter 11:12) of Zimbabwe, you have the following rights regarding your personal data:</P>
            <Stack spacing={1} sx={{ mb: 2, pl: 2 }}>
              {[
                'Right of access — to request a copy of the personal data we hold about you',
                'Right to rectification — to request correction of inaccurate or incomplete data',
                'Right to erasure — to request deletion of your data where there is no lawful basis for continued processing',
                'Right to object — to object to processing of your data for marketing purposes at any time',
                'Right to data portability — to receive your data in a structured, machine-readable format',
              ].map((item, i) => (
                <Typography key={i} variant="body2" sx={{ color: '#4A4A4A', lineHeight: 1.8, display: 'flex', gap: 1 }}>
                  <Box component="span" sx={{ color: '#EB0A1E', fontWeight: 700, flexShrink: 0 }}>—</Box>
                  {item}
                </Typography>
              ))}
            </Stack>
            <P>To exercise any of these rights, please contact us at <strong>privacy@cfao.com</strong> or visit any CFAO Toyota branch.</P>
          </Section>

          <Section title="6. Cookies">
            <P>
              This website uses cookies to enhance your browsing experience. For full details on the types of cookies we use and how to manage your preferences, please refer to our{' '}
              <Box component={Link} to="/cookie-preferences" sx={{ color: '#EB0A1E', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Cookie Policy
              </Box>.
            </P>
          </Section>

          <Section title="7. Security">
            <P>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. These measures include encrypted data transmission (SSL/TLS), access controls, and regular security assessments. However, no internet transmission is 100% secure and we cannot guarantee absolute security.
            </P>
          </Section>

          <Section title="8. Changes to This Policy">
            <P>
              We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically. Continued use of this website after changes constitutes acceptance of the revised policy.
            </P>
          </Section>

          <Section title="9. Contact Us">
            <P>
              For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Data Protection Officer:
            </P>
            <Box sx={{ bgcolor: '#F6F6F8', p: 3, borderLeft: '3px solid #EB0A1E' }}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>CFAO Toyota Zimbabwe — Data Protection Officer</Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8 }}>
                59-61 Coventry Road, Workington, Harare, Zimbabwe<br />
                Email: privacy@cfao.com<br />
                Phone: +263 (24) 2750031
              </Typography>
            </Box>
          </Section>

        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
