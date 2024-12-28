const FAQ = () => {
    const faqs = [
      {
        q: "What are Renewable Energy Credits (RECs)?",
        a: "RECs are market-based instruments that represent the environmental benefits of renewable electricity generation."
      },
      {
        q: "How does blockchain improve REC trading?",
        a: "Blockchain provides transparency, reduces fraud, and enables instant verification of renewable energy certificates."
      }
      // More FAQs...
    ];
  
    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white rounded-lg p-4">
              <summary className="font-bold cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    );
  };
export default FAQ;  