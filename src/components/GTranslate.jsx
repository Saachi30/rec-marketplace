// import React, { useEffect } from 'react';

// const GTranslate = () => {
//   useEffect(() => {
//     // Define a function to initialize Google Translate
//     const initializeGoogleTranslate = () => {
//       if (window.google && window.google.translate) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'en,hi,gu,mr,ta,fr,ja,de,ru',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           },
//           'google_translate_element'
//         );
//       }
//     };

//     // Check if the Google Translate script is already loaded
//     if (!window.google) {
//       const script = document.createElement('script');
//       script.src = '//translate.google.com/translate_a/element.js?cb=initializeGoogleTranslate';
//       script.type = 'text/javascript';
//       script.async = true;

//       // Attach callback to window
//       window.initializeGoogleTranslate = initializeGoogleTranslate;

//       // Append script to the body
//       document.body.appendChild(script);
//     } else {
//       // Initialize immediately if script is already loaded
//       initializeGoogleTranslate();
//     }
//   }, []);

//   return (
//     <div
//       id="google_translate_element"
//       style={{
//         position: 'absolute',
//         top: '3rem',
//         right: '0.2rem',
//         opacity: 0.5,
//         zIndex: 1000,
//         backgroundColor: 'white',
//         borderRadius: '5px',
//         padding: '0.5rem',
//       }}
//     ></div>
//   );
// };

// export default GTranslate;

// GTranslate.jsx
import React, { useEffect } from "react";

const GTranslate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Default language
          includedLanguages: "en,hi,gu,mr,ta,fr,ja,de,ru,en,hi", // Add desired languages here
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: 'absolute',
        top: '3rem',
        right: '0.2rem',
        opacity: 0.5,
        zIndex: 1000,
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '0.5rem',
      }}
    ></div>
  );
};

export default GTranslate;
