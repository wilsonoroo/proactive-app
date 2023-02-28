import React, { lazy, Suspense } from 'react';

const LazyLicenciaConducirV2 = lazy(() => import('./LicenciaConducirV2'));

const LicenciaConducirV2 = props => (
  <Suspense fallback={null}>
    <LazyLicenciaConducirV2 {...props} />
  </Suspense>
);

export default LicenciaConducirV2;
