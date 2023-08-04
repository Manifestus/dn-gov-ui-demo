import { Seo } from "src/components/seo";
import { usePageView } from "src/hooks/use-page-view";
import type { Page as PageType } from "src/types/page";
import { useAuth } from "../hooks/use-auth";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import EyeIcon from "@untitled-ui/icons-react/build/esm/Eye";

const Page: PageType = () => {
  usePageView();
  const { loginWithRedirect } = useAuth();
  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <>
      <Seo />
      <main>
        <Box
          height="100vh"
          sx={{
            backgroundImage:
              "url(https://res.cloudinary.com/du7w5i2uh/image/upload/v1684771200/wallpaperflare.com_wallpaper_vkshbn.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              pt: "120px",
              pl: "150px",
              display: "flex",
              direction: "rtl",
            }}
          >
            <Container maxWidth="lg">
              <Box maxWidth="sm" sx={{}}>
                <Typography variant="h1" sx={{ mb: 2 }} color="#FFF">
                  Portal&nbsp;&nbsp;
                  <Typography color="primary.main" variant="inherit">
                    Del Norte&nbsp;&nbsp;
                  </Typography>
                  <Typography color="#FFF" variant="inherit">
                    El Salvador
                  </Typography>
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                  mt={3}
                >
                  {" "}
                  <Button
                    component={RouterLink}
                    href={paths.dashboard.index}
                    sx={(theme) =>
                      theme.palette.mode === "dark"
                        ? {
                            backgroundColor: "neutral.50",
                            color: "neutral.900",
                            "&:hover": {
                              backgroundColor: "neutral.200",
                            },
                          }
                        : {
                            backgroundColor: "neutral.900",
                            color: "neutral.50",
                            "&:hover": {
                              backgroundColor: "neutral.700",
                            },
                          }
                    }
                    variant="contained"
                  >
                    Acessar
                  </Button>
                </Stack>
              </Box>
            </Container>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Page;
