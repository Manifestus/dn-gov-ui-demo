import { lazy } from 'react';
import type { RouteObject } from 'react-router';
import { Outlet } from 'react-router-dom';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { GuestGuard } from 'src/guards/guest-guard';
import { Issuer } from 'src/utils/auth';
// Auth0
const Auth0CallbackPage = lazy(() => import('src/pages/auth/auth0/callback'));
const Auth0LoginPage = lazy(() => import('src/pages/auth/auth0/login'));

export const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'auth0',
        element: (
          <IssuerGuard issuer={Issuer.Auth0}>
            <GuestGuard>
              <Outlet />
            </GuestGuard>
          </IssuerGuard>
        ),
        children: [
          {
            path: 'callback',
            element: <Auth0CallbackPage />
          },
          {
            path: 'login',
            element: <Auth0LoginPage />
          }
        ]
      },
    ]
  }
];
