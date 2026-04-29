import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name = 'MediSync', type = 'website', image = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200&h=630', url = 'https://medisync.app/' }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | MediSync` : 'MediSync | Intelligent Clinical Node'}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title ? `${title} | MediSync` : 'MediSync | Intelligent Clinical Node'} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content="@medisync" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | MediSync` : 'MediSync | Intelligent Clinical Node'} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
