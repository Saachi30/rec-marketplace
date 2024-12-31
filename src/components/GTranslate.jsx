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


import React, { useEffect } from 'react';

const GTranslate = () => {
  useEffect(() => {
    // Function to initialize Google Translate
    const initializeGoogleTranslate = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,gu,mr,ta,fr,ja,de,ru',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      }
    };

    // Function to dynamically load Google Translate script
    const loadGoogleTranslateScript = () => {
      const scriptId = 'google-translate-script';
      if (document.getElementById(scriptId)) {
        initializeGoogleTranslate();
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=initializeGoogleTranslate';
      script.type = 'text/javascript';
      script.async = true;

      // Set callback function for Google Translate
      window.initializeGoogleTranslate = initializeGoogleTranslate;

      // Append script to the document head
      document.head.appendChild(script);
    };

    loadGoogleTranslateScript();

    // Cleanup function to remove the script and global callback
    return () => {
      delete window.initializeGoogleTranslate;
      const script = document.getElementById('google-translate-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: 'absolute',
        top: '3rem',
        right: '0.5rem',
        zIndex: 1000,
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '0.5rem',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        opacity: 0.1,
      }}
    ></div>
  );
};

export default GTranslate;
