import React from 'react';
import { Helmet } from 'react-helmet-async';


const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "MediSync",
    "alternateName": "MediSync Clinical Intelligence",
    "url": "https://medisync.app/",
    "logo": "https://medisync.app/favicon.png",
    "description": "Advanced Clinical Intelligence Matrix for medical record synchronization and pharmacy routing.",
    "sameAs": [
      "https://twitter.com/medisync_core",
      "https://github.com/priyabratasahoo780/Resume-generater"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
