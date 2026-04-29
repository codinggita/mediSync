import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description = "Access your premium clinical dashboard. Sync medical records, track realtime diagnostics, and discover verified local pharmacies with intelligent price comparison.", 
  name = 'MediSync', 
  type = 'website', 
  image = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200&h=630', 
  url = 'https://medisync.app/' 
}) => {
  const fullTitle = title ? `${title} | ${name}` : `${name} | Advanced Clinical Intelligence Matrix`;
  
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content="@medisync_core" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Meta Labels */}
      <meta name="apple-mobile-web-app-title" content={name} />
      <meta name="application-name" content={name} />
      <meta name="msapplication-TileColor" content="#2A7FFF" />
    </Helmet>
  );
};

export default SEO;
