import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      {/* عنوان الصفحة */}
      <title> tbadul.vercel.app - أفضل خدمات التبادل والتبرع</title>

      {/* وصف الصفحة */}
      <meta
        name="description"
        content="هذا الموقع يهدف إلى تسهيل عمليات التبادل والتبرع والمساعدة بين المستخدمين. اكتشف خدماتنا وتمتع بتجربة مميزة."
      />

      <meta
        name="google-site-verification"
        content="mWyngtNR-ZvTSI67dm5KqFVRWiEboa4vAoKPxT0bcqI"
      />

      {/* الكلمات المفتاحية */}
      <meta
        name="keywords"
        content="تبادل, تبرع, مساعدات, خدمات, مجتمع, كتب, فئة"
      />

      {/* بيانات صاحب الموقع */}
      <meta name="author" content="abdulrahman alattar" />

      <meta
        property="og:title"
        content=" tbadul.vercel.app - أفضل خدمات التبادل والتبرع"
      />
      <meta
        property="og:description"
        content="هذا الموقع يهدف إلى تسهيل عمليات التبادل والتبرع والمساعدة بين المستخدمين. اكتشف خدماتنا وتمتع بتجربة مميزة."
      />
      <meta property="og:image" content="/path/to/your-image.jpg" />
      <meta property="og:url" content="https://tbadul.vercel.app" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="tbadul.vercel.app - أفضل خدمات التبادل والتبرع"
      />
      <meta
        name="twitter:description"
        content="هذا الموقع يهدف إلى تسهيل عمليات التبادل والتبرع والمساعدة بين المستخدمين. اكتشف خدماتنا وتمتع بتجربة مميزة."
      />
      <meta name="twitter:image" content="./favicon.ico" />

      {/* الرابط الأساسي للموقع */}
      <link rel="canonical" href="https://tbadul.vercel.app" />
    </Head>
  );
}
