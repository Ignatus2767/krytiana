function loadSubtopics(sessionId) {
  const sessionData = {
    1: [
      {
        title: "Introduction to Poultry Farming",
        subtopics: [
          { title: "What is poultry farming?", content: "Poultry farming is the practice of raising domesticated birds such as chickens, ducks, turkeys, and quails for meat, eggs, or feathers. It is one of the most important branches of agriculture, providing a major source of protein and livelihood for many people worldwide." },
          
        ]
      },
      {
        title: "Importance of Poultry Farming",
        subtopics: [
          { title: "Economic Benefits", content: "1. Poultry farming is a profitable agribusiness with relatively fast returns. 2. It provides employment opportunities in rural and urban areas. 3. It supports other industries, such as feed production, veterinary services, and egg/meat processing." },
          { title: "Nutritional Benefits", content: "1. Poultry products (eggs and meat) are rich sources of high-quality protein, essential for body growth and repair. 2. Poultry meat has lower fat content compared to red meat, making it a healthier protein source. 3. Eggs contain important nutrients like vitamins (B12, D), minerals (selenium, iron), and omega-3 fatty acids." },
          { title: "Environmental Benefits", content: "1. Poultry farming has a lower environmental impact compared to cattle farming (less methane gas emission). 2. Poultry waste (manure) is a good organic fertilizer for crop farming." }
          
        ]
      },

      {
        title: "Types of Poultry Farming ",
        subtopics: [
          { title: "Based on Production Purpose ", content: "1. Broiler Farming – Raising chickens specifically for meat production. Broilers grow faster and are ready for market within 5-8 weeks. 2. Layer Farming – Rearing chickens for egg production. Layers start laying eggs at around 18-22 weeks and can produce eggs for about 1.5 years. 3. Dual-Purpose Farming – Keeping breeds that provide both meat and eggs, such as Rhode Island Red and Sussex. 4. Specialty Poultry Farming – Raising ducks, turkeys, quails, or guinea fowls for meat, eggs, or ornamental purposes. " },
          { title: "Based on Rearing System ", content: "1. Intensive System – Poultry is kept in a controlled environment, such as deep litter systems or battery cages. This system maximizes production but requires higher investment in housing, feeding, and management. 2. Semi-Intensive System – A combination of free-range and intensive systems, where birds have access to outdoor areas but also receive supplementary feed. 3. Extensive (Free-Range) System – Birds are allowed to roam freely and feed naturally. It is a low-cost method but has lower productivity and higher risks of diseases and predators. " },
          { title: "Getting Started with Poultry Farming ", content: "To start poultry farming, you need: 1. A business plan (defining goals, budget, and market research). 2. A suitable location (well-drained land, access to water and electricity). 3. Knowledge of poultry breeds, their growth patterns, and market demands. 4. Proper housing and feeding systems to ensure healthy bird growth. 5. A basic understanding of disease control and vaccination. " },
          { title: "Key Takeaways from Lesson 1 ", content: "1. Poultry farming is an important source of food and income. 2. There are different types of poultry farming based on production goals and rearing methods. 3. Understanding market demand, breed selection, and proper management is crucial for success. " }
        ]
      },
      {
        title: " ",
        subtopics: [
          { title: " ", content: " " },
          { title: " ", content: " " },
          { title: " ", content: " " }
          
        ]
      }
      

    ],

    2: [
      {
      title: "Selecting the Right Breed ",
      subtopics: [
        { title: "Right Breed ", content: "Choosing the right breed is one of the most important decisions in poultry farming. The breed you select will determine productivity, cost, and overall success. Poultry breeds are categorized based on their purpose: meat production, egg production, or dual-purpose. " },
        { title: "Best Breeds for Meat Production (Broilers) ", content: "Broilers are chickens bred specifically for fast growth and high meat yield. They are ready for market in 5 to 8 weeks. " },
        { title: "Top Broiler Breeds: ", content: "1. Cornish Cross – The most popular broiler breed, known for rapid growth and large breast meat. 2. Cobb 500 – Fast-growing, high feed conversion, and uniform size. 3. Ross 308 – Excellent feed efficiency and high meat yield. 4. Red Broilers – Slower-growing than Cornish Cross but more resilient to diseases. 5. Sasso Chickens – Hardy, slower-growing, but better suited for free-range systems. " },
        { title: " Key Features of Broilers: ", content: "1. Fast weight gain (2.5 to 3 kg in 6 weeks). 2. High feed conversion efficiency. 3. Require proper housing and feeding for best results." }
        ]
      },

      {
        title: "Best Breeds for Egg Production (Layers) ",
        subtopics: [
          { title: "Layers ", content: "Layer breeds are selected for high egg production and typically start laying at 18-22 weeks old. " },
          { title: "Top Layer Breeds: ", content: "1. White Leghorn – High egg production (280-320 eggs/year), small body size, and efficient feed conversion.2. Rhode Island Red – Hardy birds, brown eggs, and good egg production (250-300 eggs/year).3. Isa Brown – Hybrid breed, excellent egg layer (300+ eggs/year), friendly temperament.4. Lohmann Brown – High egg yield, good feed conversion, and long laying period.5. Sussex – Dual-purpose breed but still a strong egg producer. " },
          { title: " Key Features of Layers: ", content: "1. Start laying at 18-22 weeks old. 2. Can lay 250-320 eggs per year depending on the breed. 3. Require a calcium-rich diet for strong eggshells." }
          
        ]
      },

      {
        title: "Dual-Purpose Breeds ",
        subtopics: [
          { title: "Dual-purpose breeds ", content: "Dual-purpose breeds are good for both meat and eggs, making them ideal for farmers who want flexibility." },
          { title: "Top Dual-Purpose Breeds: ", content: "1. Rhode Island Red – Hardy, lays 250+ eggs per year, and provides decent meat yield. 2. Sussex – Excellent egg production (250+ eggs/year) and good meat quality. 3. Plymouth Rock – Produces 200-250 eggs per year and has a good meat-to-fat ratio. 4. Australorp – Record-breaking egg layer (300+ eggs/year) with good meat quality. 5. Orpington – Heavy body, good meat yield, and decent egg production (200+ eggs/year). " },
          { title: "Why Choose Dual-Purpose Breeds? ", content: "1. Suitable for small-scale farmers who want eggs and meat. 2. Hardy and adaptable to different climates. 3. Can be raised in free-range or confined systems. " }
          
        ]
      },

      {
        title: "Factors to Consider When Choosing a Breed ",
        subtopics: [
          { title: " Purpose of Farming ", content: "1. Meat production? Choose fast-growing broilers. 2. Egg production? Select high-laying layer breeds. 3, Both? Go for dual-purpose breeds. " },
          { title: "Climate Adaptability ", content: "1. Some breeds tolerate heat better (e.g., Sasso, Rhode Island Red). 2. Others perform best in cooler climates (e.g., White Leghorns). " },
          { title: "Disease Resistance ", content: "1. Some breeds (like Sasso and Rhode Island Red) are hardy and resist common poultry diseases. 2. Hybrid breeds (like Isa Brown) require strict vaccination programs. " },
          { title: "Feeding Requirements ", content: "1. Broilers need high-protein feed for fast growth. 2. Layers need calcium-rich feed for strong eggshells. 3. Free-range breeds can supplement their diet with insects and greens. " },
          { title: "Market Demand ", content: "1. Study local demand for eggs or meat before investing in a breed. 2. Hybrid breeds (like Isa Brown and Cornish Cross) dominate commercial markets. " },
          { title: "Space Availability ", content: "1. Broilers need well-ventilated housing to prevent heat stress. 2. Layers require nesting areas for comfortable egg-laying. 3. Free-range breeds need outdoor space for movement. " }
          
        ]
      },

      {
        title: "Key Takeaways from Lesson 2 ",
        subtopics: [
          { title: "summary ", content: "1.✔ Broilers grow fast and are best for meat production. 2. ✔ Layer breeds lay many eggs but are not ideal for meat. 3. ✔ Dual-purpose breeds offer a balance of eggs and meat. 4. ✔ Choosing the right breed depends on purpose, climate, and feeding requirements. " },
          
        ]
      }



    ],

    3: [
      {
        title: "Housing and Equipment ",
        subtopics: [
          { title: "Highlight ", content: "Proper housing and equipment are essential for healthy growth, productivity, and disease prevention in poultry farming. The right housing system depends on factors like farm size, climate, budget, and poultry type. " },
          { title: "Types of Poultry Housing ", content: "<span style='font-size:20px;'>Deep Litter System</span> <br><br> In this system, birds are raised on the floor with bedding materials like wood shavings, straw, or rice husks. <br><br> <strong>Advantages:</strong> <br><br> Cheaper to build.<br><br> Allows birds to move freely.<br><br> Bedding absorbs waste and reduces odor. <br><br><strong>⚠ Disadvantages:</strong> <br><br>Can cause disease outbreaks if not cleaned regularly. <br><br>Requires more space per bird than cages. " },
          { title: "Battery Cage System ", content: "Birds are kept in metal wire cages, usually stacked in tiers. This method is common for commercial layers.<br><br> <strong>Advantages:</strong><br><br>✅Higher egg production efficiency.<br><br> ✅Easier feeding, egg collection, and waste management.<br><br> ✅Saves space, allowing more birds per unit area.<br><br><strong>⚠ Disadvantages:</strong><br><br>✅High initial setup cost.<br><br>✅Less natural movement, which may lead to stress.<br><br>✅Needs proper ventilation to reduce ammonia buildup. " }
          
        ]
      },
      

     
    ],

    4: [
      
    ]

  };
  

  const sessionSections = sessionData[sessionId]; // Get sections for the session
  if (!sessionSections) return;

  const contentContainer = document.getElementById(`content-${sessionId}`); 
  contentContainer.innerHTML = `<h2>Session ${sessionId}</h2>`; // Clear existing content

  sessionSections.forEach((section, sectionIndex) => {
    // Create Section Title
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("section");

    const sectionTitleDiv = document.createElement("div");
    sectionTitleDiv.classList.add("section-title");
    sectionTitleDiv.innerHTML = `
      <span>${section.title}</span>
      <span class="arrow">&#9660;</span>
    `;
    sectionTitleDiv.onclick = () => toggleContent(`${sessionId}-${sectionIndex}`);

    // Create Section Content
    const sectionContentDiv = document.createElement("div");
    sectionContentDiv.classList.add("section-content");
    sectionContentDiv.id = `section-${sessionId}-${sectionIndex}`;
    sectionContentDiv.style.display = "none";

    // Add Subtopics
    section.subtopics.forEach((subtopic, subIndex) => {
      const subtopicElement = document.createElement("p");
      subtopicElement.innerText = `${sessionId}.${sectionIndex + 1}.${subIndex + 1} ${subtopic.title}`;
      subtopicElement.onclick = () => displaySubtopic(subtopic.title, subtopic.content);
      sectionContentDiv.appendChild(subtopicElement);
    });

    // Append Elements
    sectionDiv.appendChild(sectionTitleDiv);
    sectionDiv.appendChild(sectionContentDiv);
    contentContainer.appendChild(sectionDiv);
  });

  // Show first subtopic by default (if available)
  if (sessionSections[0]?.subtopics?.length > 0) {
    displaySubtopic(sessionSections[0].subtopics[0].title, sessionSections[0].subtopics[0].content);
  }
}


