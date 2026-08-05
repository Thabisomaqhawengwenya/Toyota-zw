import React, { useState } from 'react';
import { Box, Container, Typography, Divider, Switch, FormControlLabel, Button, Alert, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import CookieIcon from '@mui/icons-material/Cookie';

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

interface CookieToggleProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (val: boolean) => void;
}

const CookieToggle: React.FC<CookieToggleProps> = ({ title, description, checked, disabled, onChange }) => (
  <Box sx={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    gap: 2, p: 3, border: '1px solid #EAEAEA', bgcolor: '#FAFAFA', mb: 2,
  }}>
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 0.5 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>{description}</Typography>
      {disabled && (
        <Typography variant="caption" sx={{ color: '#EB0A1E', fontWeight: 600, mt: 0.5, display: 'block' }}>
          Always active — required for the site to function
        </Typography>
      )}
    </Box>
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': { color: '#EB0A1E' },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#EB0A1E' },
          }}
        />
      }
      label=""
      sx={{ m: 0, flexShrink: 0 }}
    />
  </Box>
);

export const CookiePreferences: React.FC = () => {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [preferences, setPreferences] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '80vh' }}>
      {/* Banner */}
      <Box sx={{ bgcolor: '#1E1E1E', borderBottom: '4px solid #EB0A1E', py: { xs: 7, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'rgba(235,10,30,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CookieIcon sx={{ color: '#EB0A1E', fontSize: 30 }} />
            </Box>
          </Box>
          <Typography variant="subtitle2" sx={{ color: '#EB0A1E', fontWeight: 800, letterSpacing: '3px', mb: 1 }}>
            LEGAL
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#FFFFFF', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            COOKIE PREFERENCES
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}>
            Last updated: 1 January 2026 &nbsp;·&nbsp; CFAO Toyota Zimbabwe
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ bgcolor: 'background.paper', border: '1px solid #EAEAEA', p: { xs: 3, md: 6 } }}>

          <P>
            This website uses cookies and similar tracking technologies to improve your browsing experience, analyse site traffic, and deliver relevant content. This policy explains what cookies we use, why we use them, and how you can control your preferences. By using this site, you consent to our use of cookies in accordance with this policy and the <strong>Data Protection Act (Chapter 11:12) of Zimbabwe</strong>.
          </P>

          <Section title="What Are Cookies?">
            <P>
              Cookies are small text files placed on your device when you visit a website. They allow the website to recognise your device on return visits, remember your preferences, and provide a more personalised experience. Cookies cannot execute programs or deliver viruses to your device. They are uniquely assigned to your browser and can only be read by the web server that issued them.
            </P>
          </Section>

          <Section title="Types of Cookies We Use">
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1E1E', mb: 0.5 }}>Essential Cookies</Typography>
              <P>These cookies are strictly necessary for the website to function correctly. They enable core functionality such as page navigation, form submissions, and security. You cannot opt out of these cookies as the website cannot function without them.</P>

              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1E1E', mb: 0.5 }}>Analytics Cookies</Typography>
              <P>These cookies help us understand how visitors use our website — which pages are most visited, how long users stay, and where they come from. This data is aggregated and anonymous, and is used solely to improve website performance and content. We use Vercel Analytics for this purpose.</P>

              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1E1E', mb: 0.5 }}>Preference Cookies</Typography>
              <P>These cookies allow the website to remember choices you have made — such as your saved vehicles, comparison selections, and recently viewed models — to provide a more personalised experience across sessions.</P>

              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E1E1E', mb: 0.5 }}>Marketing Cookies</Typography>
              <P>These cookies may be set by our advertising partners to build a profile of your interests and show relevant Toyota advertisements on other websites. They track your visits across sites and are used to deliver targeted promotional content.</P>
            </Box>
          </Section>

          <Section title="Manage Your Preferences">
            <P>Use the toggles below to control which categories of cookies you consent to. Your preferences will be saved and applied to this browser on this device.</P>

            {saved && (
              <Alert severity="success" sx={{ borderRadius: 0, mb: 3, fontWeight: 600 }}>
                Your cookie preferences have been saved.
              </Alert>
            )}

            <CookieToggle
              title="Essential Cookies"
              description="Required for basic site functionality including navigation, forms, and security. Cannot be disabled."
              checked={true}
              disabled={true}
            />
            <CookieToggle
              title="Analytics Cookies"
              description="Help us understand how visitors interact with our site so we can improve the experience. Data is anonymised."
              checked={analytics}
              onChange={setAnalytics}
            />
            <CookieToggle
              title="Preference Cookies"
              description="Remember your saved vehicles, comparisons, and browsing preferences across sessions."
              checked={preferences}
              onChange={setPreferences}
            />
            <CookieToggle
              title="Marketing Cookies"
              description="Used to deliver relevant Toyota promotions and advertisements on other websites you visit."
              checked={marketing}
              onChange={setMarketing}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ fontWeight: 700, borderRadius: '7px', textTransform: 'none', px: 4, py: 1.5, boxShadow: 'none' }}
              >
                Save My Preferences
              </Button>
              <Button
                variant="outlined"
                onClick={() => { setAnalytics(true); setPreferences(true); setMarketing(true); }}
                sx={{ fontWeight: 700, borderRadius: '7px', textTransform: 'none', px: 4, py: 1.5, borderColor: '#DCDCDC', color: 'text.primary', '&:hover': { borderColor: '#1E1E1E' } }}
              >
                Accept All
              </Button>
              <Button
                variant="outlined"
                onClick={() => { setAnalytics(false); setPreferences(false); setMarketing(false); }}
                sx={{ fontWeight: 700, borderRadius: '7px', textTransform: 'none', px: 4, py: 1.5, borderColor: '#DCDCDC', color: 'text.primary', '&:hover': { borderColor: '#1E1E1E' } }}
              >
                Reject Non-Essential
              </Button>
            </Stack>
          </Section>

          <Section title="How to Manage Cookies in Your Browser">
            <P>
              In addition to the controls above, you can manage or delete cookies directly through your browser settings. Note that disabling certain cookies may affect the functionality of this website. Instructions for popular browsers:
            </P>
            <Stack spacing={1} sx={{ pl: 2, mb: 2 }}>
              {[
                'Google Chrome — Settings → Privacy & Security → Cookies and other site data',
                'Mozilla Firefox — Settings → Privacy & Security → Cookies and Site Data',
                'Microsoft Edge — Settings → Cookies and site permissions',
                'Safari — Preferences → Privacy → Manage Website Data',
              ].map((item, i) => (
                <Typography key={i} variant="body2" sx={{ color: '#4A4A4A', lineHeight: 1.8, display: 'flex', gap: 1 }}>
                  <Box component="span" sx={{ color: '#EB0A1E', fontWeight: 700, flexShrink: 0 }}>—</Box>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Section>

          <Section title="Third-Party Cookies">
            <P>
              Some cookies on this site are placed by third-party services including Vercel Analytics, Google Fonts, and social media platforms (Facebook, Instagram, Twitter/X, LinkedIn, YouTube). These services may have their own cookie and privacy policies which we encourage you to review. We do not control the cookies placed by these third parties.
            </P>
          </Section>

          <Section title="Updates to This Policy">
            <P>
              We may update this Cookie Policy from time to time to reflect changes in our practices or applicable law. Any changes will be posted on this page with a revised date. Continued use of this website after such changes constitutes your acceptance of the updated policy.
            </P>
          </Section>

          <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #F0F0F0', display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box component={Link} to="/privacy-policy" sx={{ color: '#EB0A1E', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Privacy Policy →
            </Box>
            <Box component={Link} to="/terms-of-use" sx={{ color: '#EB0A1E', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Terms of Use →
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default CookiePreferences;
