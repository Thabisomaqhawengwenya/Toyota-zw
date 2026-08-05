import React from 'react';
import { Box, Container, Typography, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import GavelIcon from '@mui/icons-material/Gavel';

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

export const TermsOfUse: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '80vh' }}>
      {/* Banner */}
      <Box sx={{ bgcolor: '#1E1E1E', borderBottom: '4px solid #EB0A1E', py: { xs: 7, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'rgba(235,10,30,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GavelIcon sx={{ color: '#EB0A1E', fontSize: 30 }} />
            </Box>
          </Box>
          <Typography variant="subtitle2" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            LEGAL
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#FFFFFF', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            TERMS OF USE
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}>
            Last updated: 1 January 2026 &nbsp;·&nbsp; CFAO Toyota Zimbabwe
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ bgcolor: 'background.paper', border: '1px solid #EAEAEA', p: { xs: 3, md: 6 } }}>

          <P>
            By accessing and using this website (<strong>toyota.co.zw</strong>), operated by CFAO Toyota Zimbabwe ("we", "us", "our"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use this website. We reserve the right to modify these terms at any time without prior notice.
          </P>

          <Section title="1. Acceptance of Terms">
            <P>
              Your continued use of this website constitutes your acceptance of these Terms of Use and any modifications made to them. These terms apply to all visitors, users, and others who access or use this website. These terms are governed by the laws of Zimbabwe.
            </P>
          </Section>

          <Section title="2. Website Content & Accuracy">
            <P>
              All vehicle information, pricing, specifications, colours, availability, and promotional offers displayed on this website are provided for general information purposes only and are subject to change without prior notice.
            </P>
            <P>
              <strong>Vehicle prices</strong> shown are indicative guide prices only and do not constitute a binding offer to sell. Final pricing is confirmed at the dealership and may be subject to applicable taxes, registration fees, and optional extras.
            </P>
            <P>
              <strong>Vehicle images</strong> are for illustrative purposes only. Actual vehicles may differ in colour, trim level, accessories, and specification from images shown on this site. Colours displayed on screen may not accurately represent actual vehicle paint finishes due to monitor calibration variations.
            </P>
            <P>
              <strong>Availability</strong> of vehicles shown on this website is not guaranteed. Vehicles are subject to prior sale and stock availability confirmation at your nearest CFAO Toyota branch.
            </P>
          </Section>

          <Section title="3. Finance Calculator Disclaimer">
            <P>
              The payment calculator tool provided on this website is for estimation purposes only. Monthly instalment figures generated are indicative and based on user-inputted variables. They do not constitute a credit offer, credit approval, or binding financial agreement of any kind.
            </P>
            <P>
              Actual finance terms, interest rates, monthly instalments, and approval are subject to formal credit assessment by the relevant banking institution. CFAO Toyota Zimbabwe is not a registered financial services provider and does not offer credit directly.
            </P>
          </Section>

          <Section title="4. Intellectual Property">
            <P>
              All content on this website — including but not limited to text, graphics, logos, images, vehicle data, and page layouts — is the property of CFAO Toyota Zimbabwe, Toyota Motor Corporation, or their respective licensors and is protected by applicable intellectual property laws.
            </P>
            <P>
              "Toyota", the Toyota logo, and all Toyota model names are registered trademarks of Toyota Motor Corporation. You may not reproduce, republish, distribute, or create derivative works from any content on this site without prior written permission.
            </P>
          </Section>

          <Section title="5. Permitted Use">
            <P>You may use this website solely for personal, non-commercial purposes including:</P>
            <Stack spacing={1} sx={{ mb: 2, pl: 2 }}>
              {[
                'Browsing vehicle models, specifications, and pricing information',
                'Submitting enquiries for vehicles, test drives, services, or finance',
                'Accessing news, promotions, and branch information',
              ].map((item, i) => (
                <Typography key={i} variant="body2" sx={{ color: '#4A4A4A', lineHeight: 1.8, display: 'flex', gap: 1 }}>
                  <Box component="span" sx={{ color: '#EB0A1E', fontWeight: 700, flexShrink: 0 }}>—</Box>
                  {item}
                </Typography>
              ))}
            </Stack>
            <P>You may not use this website to scrape data, submit false enquiries, impersonate any person or entity, or engage in any activity that could damage, disable, or impair the website or its infrastructure.</P>
          </Section>

          <Section title="6. Third-Party Links">
            <P>
              This website may contain links to third-party websites including banking partners and social media platforms. These links are provided for convenience only. CFAO Toyota Zimbabwe has no control over the content of those sites and accepts no responsibility or liability for their content, privacy practices, or any damages arising from your use of them.
            </P>
          </Section>

          <Section title="7. Limitation of Liability">
            <P>
              To the fullest extent permitted by applicable law, CFAO Toyota Zimbabwe shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, this website or its content, even if we have been advised of the possibility of such damages.
            </P>
            <P>
              We do not warrant that this website will be uninterrupted, error-free, or free of viruses or other harmful components. You are responsible for implementing adequate security and virus-checking measures on your own systems.
            </P>
          </Section>

          <Section title="8. Governing Law">
            <P>
              These Terms of Use are governed by and construed in accordance with the laws of the Republic of Zimbabwe. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Zimbabwe.
            </P>
          </Section>

          <Section title="9. Contact">
            <P>
              For enquiries regarding these Terms of Use, please contact:
            </P>
            <Box sx={{ bgcolor: '#F6F6F8', p: 3, borderLeft: '3px solid #EB0A1E' }}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>CFAO Toyota Zimbabwe — Legal Department</Typography>
              <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.8 }}>
                59-61 Coventry Road, Workington, Harare, Zimbabwe<br />
                Email: legal@cfao.com<br />
                Phone: +263 (24) 2750031
              </Typography>
            </Box>
          </Section>

          <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #F0F0F0', display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box component={Link} to="/privacy-policy" sx={{ color: '#EB0A1E', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Privacy Policy →
            </Box>
            <Box component={Link} to="/cookie-preferences" sx={{ color: '#EB0A1E', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Cookie Preferences →
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default TermsOfUse;
