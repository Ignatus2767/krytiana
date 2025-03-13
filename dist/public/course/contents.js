const courses = [
  {
      title: "INTRODUCTION TO DATA SCIENCE",
      sections: [
        {
            heading: "DATA SCIENCE",
            content: `
            Learning data science is unique, Data science involves working with data to find insights, and it typically includes: <br><br>
            1. Learning Python – The most widely used programming language in data science. <br>
            2. Understanding Data – How to collect, clean, and process data. <br>
            3. Exploratory Data Analysis (EDA) – Using statistics and visualization to understand data. <br>
            4. Data Analytics – Drawing conclusions and making decisions based on data. <br>
            5. Machine Learning (optional, later) – Teaching computers to find patterns and make predictions. <br><br>

            <strong>Overview of Data Science & Analytics</strong><br><br>

            Data science is the process of analyzing and interpreting data to extract useful insights. It combines statistics, programming, and domain knowledge to make data-driven decisions. <br><br>
            1. The Data Science Process<br><br>
            The typical steps in data science include: <br>
            Problem Definition – Understanding the question we want to answer. <br>
            Data Collection – Gathering data from sources like databases, APIs, or spreadsheets. <br>
            Data Cleaning – Removing errors, handling missing values, and organizing data. <br>
            Exploratory Data Analysis (EDA) – Summarizing and visualizing data to identify patterns. <br>
            Data Analysis & Modeling – Using statistical methods or machine learning to analyze data. <br>
            Interpretation & Communication – Presenting findings through reports, charts, or dashboards. <br><br>

            2. Data Science vs. Data Analytics<br><br>
            Data Science focuses on developing models, making predictions, and finding deep insights using machine learning and statistics. <br>
            Data Analytics is more about analyzing past data, identifying trends, and making business decisions. <br><br>

            3. Tools Used in Data Science<br><br>
            Python – The most popular language for data science. <br>
            Pandas & NumPy – Libraries for handling and processing data. <br>
            Matplotlib & Seaborn – For data visualization. <br>
            SQL – Used to query databases. <br>
            Machine Learning Libraries (Later) – Scikit-learn, TensorFlow, etc. <br><br>

            4. Real-World Applications<br><br>
            Business Analytics – Predicting customer trends, sales forecasting. <br>
            Healthcare – Diagnosing diseases using machine learning. <br>
            Finance – Fraud detection, stock market analysis. <br>
            Marketing – Customer segmentation, targeted ads. <br><br>

            `
        },
        {
            heading: "GETTING STARTED",
            
            content: `
                <strong>Road Map</strong><br>
                Since data science involves programming, we’ll start by;  <br><br>
                
                1. Learn Python Basics – Variables, data types, loops, and functions. <br>
                2. Work with Data Using Pandas & NumPy – Handling large datasets. <br>
                3. Data Visualization – Using Matplotlib & Seaborn to create graphs. <br>
                4. Statistics & Probability – Understanding distributions, mean, median, etc. <br>
                5. Machine Learning Basics – Training models to make predictions. <br><br>
                
                


            `
            
        },
        {
            heading: "",
            content: `
                
            `,
            codes: [
                { lang: "bash", code: `python script.py` },
                { lang: "bash", code: `pip install notebook` },
                { lang: "bash", code: `jupyter notebook` },
                { lang: "python", code: `print("Hello, Jupyter Notebook!")` },
            ],
            images: [
                "images/facebook.png",
                "images/twitter.png",
                "images/whatsapp.png"]
        },
       
        
        
        
      ]
  },
  {
    title: "PYTHON",
    sections: [
        {
            heading: "Basics of Python",
            video: "https://www.youtube.com/embed/PtFnk0btJOQ?si=3p50S4ZiIed_KbHI", 
            content: `
               <strong> Let's start with the basics of Python. </strong><br><br>
                What's python when we talk about data science?<br><br>
                In data science, Python is a programming language widely used for data analysis, visualization, machine learning, and statistical modeling. It's popular because of its simplicity, readability, and a vast ecosystem of libraries tailored for data science tasks. Let div in<br><br>

                1. Installing Python<br><br>
                To run Python, you can: <br>
                Download and install Python from <br>
                https://www.python.org/downloads/<br><br>
                Use an online editor like Google Colab (recommended for data science) or Jupyter Notebook<br><br>
                Once Python is installed, You can start coding in Python using one of these methods: <br><br>
                1. Using the Python Interpreter (Quick & Simple) <br>
                Open a Terminal (Mac/Linux) or Command Prompt (Windows). <br>
                Type python (or python3 if needed) and press Enter. <br>
                You can now type Python code directly. <br><br>
                2. Using a Python File (.py) <br>
                Open a text editor (e.g., Notepad, VS Code, PyCharm). <br>
                Create a new file and name it script.py. <br>
                Write your Python code inside the file. <br><br>
                <strong>Save and run it using:</strong> code1
                3. Using Jupyter Notebook (Recommended for Data Science so will stick to this) <br>
                Install Jupyter Notebook if you haven't: <br>
                Open a Terminal (Mac/Linux) or Command Prompt (Windows) as administrator and type or copy and paste: code2
                
                To install and Start it by running: code3
            
                A browser window will open where you can write and run Python code interactively.
                Create a New Notebook<br><br>
                Click "New" → "Python 3" to open a new notebook.<br>
                Write Python code in the cells and press Shift + Enter to run it.
                Try running this simple test code in a new cell: code4
                If you run into any problem, watch the video above.
            `,
            codes: [
                { lang: "bash", code: `python script.py` },
                { lang: "bash", code: `pip install notebook` },
                { lang: "bash", code: `jupyter notebook` },
                { lang: "python", code: `print("Hello, Jupyter Notebook!")` },
            ]
        },
        
        
    ]
},
{
    title: "VARIABLE IN PYTHON",
    sections: [
        {
            heading: "1. What is a Variable?",
            content: `
                A variable is a named reference to a value stored in memory. In Python, you don't need to declare the type of a variable explicitly—Python infers it dynamically. <br>
          `,
          codes: [
            { lang: "python", code: `
                x = 10  # x is an integer
                name = "Alice"  # name is a string
                pi = 3.14  # pi is a float
                is_valid = True  # is_valid is a boolean

                ` },
            
            ],
        },
        {
            heading: "2. Variable Naming Rules",
            content: `
                Must start with a letter (A-Z or a-z) or an underscore _<br>
                Can contain letters, digits (0-9), and underscores<br>
                Cannot be a Python keyword (if, for, while, etc.) <br>
                Case-sensitive (myVar and myvar are different) <br>
                <strong> Valid names: </strong> code1
                <strong> Invalid names: </strong><br> code2

          `,
          codes: [
            { lang: "python", code: `
                my_variable = 10
                _var123 = "hello"
                CamelCase = "works"
                ` },
            { lang: "python", code: `
                2var = 5    # Starts with a number (❌)
                my-variable = 10  # Hyphens are not allowed (❌)
                class = "Python"  # Reserved keyword (❌)
                
                ` },
            
            ],
        },
        {
            heading: "Variable Assignment and Reassignment ",
            content: `
             You can assign and reassign values to variables dynamically. code1
             Python is dynamically typed, meaning a variable can hold values of different types during execution. 
          `,
          codes: [
            { lang: "python", code: `
              x = 5\n
              print(x)  # 5\n
              x = "hello"\n
              print(x)  # hello
                
                ` },
            
            ],
        },








        
      {
          heading: "",
          video: "", 
          content: `
             
          `,
            codes: [
            { lang: "", code: `` },
            
            ],
            images: [
                "images/facebook.png",
            ]

      },
        
    ]
},













  {
      title: "",
      sections: [
          {
              heading: "",
              content: `
                 
              `
          },
          {
            heading: "",
            content: `
               
            `
        },
        {
            heading: "",
            content: `
               
            `
        },
        {
            heading: "",
            content: `
               
            `
        },
          
      ]
  },

];

