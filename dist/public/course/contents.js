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
                x = 5
                print(x)  # 5
                x = "hello"
                print(x)  # hello
                    
                    ` },
                
                ],
            },
            
            
        ]
    },
    {
        title: "LISTS IN PYTHON (Aray)",
        sections: [
            
        {
            heading: "1. What is a List?",
             
            content: `
                A list is an ordered, mutable (changeable) collection that can store elements of different data types. It is similar to an array but more flexible.
                <br><br>Creating a List code1
                You can also create a list using the list() constructor: code2
            `,
            codes: [
                { lang: "python", code: `
                  numbers = [1, 2, 3, 4, 5]  # List of integers
                  mixed = [1, "Hello", 3.14, True]  # List with mixed data types
                  empty_list = []  # An empty list  
                    ` },
                { lang: "python", code: `
                  my_list = list((10, 20, 30))  # Creating a list from a tuple
                  print(my_list)  # [10, 20, 30]  
                    ` },
                
            ],


        },
        {
            heading: "2. Accessing Elements", 
            content: `
               Lists support zero-based indexing, meaning the first element is at index 0.
               code1 
            `,
            codes: [
                { lang: "python", code: `
                 fruits = ["apple", "banana", "cherry"]
                 print(fruits[0])  # apple
                 print(fruits[1])  # banana
                 print(fruits[-1])  # Last element (cherry)
                 print(fruits[-2])  # Second last element (banana)   
                    ` },
                
            ],

          

        },
        {
            heading: "3. Slicing a List",
        
            content: `
              Slicing allows you to extract parts of a list.
              code1  
            `,
            codes: [
                { lang: "python", code: `
                numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                
                print(numbers[2:6])   # [2, 3, 4, 5] (from index 2 to 5)
                print(numbers[:4])    # [0, 1, 2, 3] (first 4 elements)
                print(numbers[5:])    # [5, 6, 7, 8, 9] (from index 5 to end)
                print(numbers[::2])   # [0, 2, 4, 6, 8] (every 2nd element)
                print(numbers[::-1])  # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (reverse list)    
                    ` },
                
            ],

           

        },
        {
            heading: "4. Modifying Lists",
           
            content: `
              Lists are mutable, meaning you can change their values.
              code1  
              You can also replace multiple values using slicing:
              code2
            `,
            codes: [
                { lang: "python", code: `
                nums = [10, 20, 30, 40]
                nums[1] = 25  # Changing the second element
                print(nums)  # [10, 25, 30, 40]    
                    ` },
                { lang: "python", code: `
                nums[1:3] = [50, 60]
                print(nums)  # [10, 50, 60, 40]    
                    ` },
                
            ],

           

        },
        {
            heading: "5. Adding Elements",
             
            content: `
              Using append() (Adds to the end)
              code1  
              Using insert() (Adds at a specific index)
              code2
              Using extend() (Merges two lists)
              code3
            `,
            codes: [
                { lang: "python", code: `
                fruits = ["apple", "banana"]
                fruits.append("cherry")
                print(fruits)  # ['apple', 'banana', 'cherry']    
                    ` },
                { lang: "python", code: `
                fruits.insert(1, "orange")  # Insert at index 1
                print(fruits)  # ['apple', 'orange', 'banana', 'cherry']    
                    ` },
                { lang: "python", code: `
                a = [1, 2, 3]
                b = [4, 5, 6]
                a.extend(b)
                print(a)  # [1, 2, 3, 4, 5, 6] 
                    ` },
                
            ],

           

        },
        {
            heading: "6. Removing Elements",
             
            content: `
            Using pop() (Removes by index, default is last)
            code1
            Using remove() (Removes by value)
            code2
            Using del (Removes by index or deletes the whole list)
            code3
            Using clear() (Empties the list) 
            code4
            `,
            codes: [
                { lang: "python", code: `
                fruits = ["apple", "banana", "cherry"]
                fruits.pop()  # Removes last element
                print(fruits)  # ['apple', 'banana']
                
                fruits.pop(0)  # Removes first element
                print(fruits)  # ['banana']    
                    ` },
                { lang: "python", code: `
                numbers = [10, 20, 30, 40]
                numbers.remove(20)  # Removes the first occurrence of 20
                print(numbers)  # [10, 30, 40]
                    ` },
                { lang: "python", code: `
                nums = [1, 2, 3, 4, 5]
                del nums[2]  # Removes element at index 2
                print(nums)  # [1, 2, 4, 5]
                
                del nums  # Deletes the entire list
                    ` },
                { lang: "python", code: `
                nums = [1, 2, 3]
                nums.clear()
                print(nums)  # []
                    ` },
        ],

            

        },
        {
            heading: "7. Looping Through Lists",
            
            content: `
            Using for Loop
            code1
            Using while Loop
            code2
            Using list comprehension
            code3
            `,
            codes: [
             { lang: "python", code: `
            fruits = ["apple", "banana", "cherry"]
            for fruit in fruits:
                print(fruit)        
            ` },
            { lang: "python", code: `
             nums = [10, 20, 30]
             i = 0
             while i < len(nums):
                 print(nums[i])
                 i += 1       
            ` },
            { lang: "python", code: `
            squares = [x ** 2 for x in range(5)]
            print(squares)  # [0, 1, 4, 9, 16]        
             ` },

                
            ],

            

        },
        {
            heading: "8. Sorting and Reversing Lists",
            
            content: `
            Using sort() (Ascending)
            code1
            Sorting in Descending Order
            code2
            Using sorted() (Returns a new sorted list)
            code3
            Reversing a List
            code4

            `,
            codes: [
                { lang: "python", code: `
                nums = [4, 2, 9, 1]
                nums.sort()
                print(nums)  # [1, 2, 4, 9]    
                ` },
                { lang: "python", code: `
                 nums.sort(reverse=True)
                 print(nums)  # [9, 4, 2, 1]   
                ` },
                { lang: "python", code: `
                 nums = [4, 2, 9, 1]
                 new_nums = sorted(nums)
                 print(new_nums)  # [1, 2, 4, 9]   
                ` },
                { lang: "python", code: `
                 nums = [1, 2, 3]
                 nums.reverse()
                 print(nums)  # [3, 2, 1]   
                ` },

                
            ],

            

        },
        {
            heading: "9. Copying a List",
            
            content: `
             Using copy()
             code1
             Using list()
             code2
             Using Slicing ([:])
             code3

            `,
            codes: [
                { lang: "python", code: `
                original = [1, 2, 3]
                copied = original.copy()
                print(copied)  # [1, 2, 3]
                ` },
                { lang: "python", code: `
                copied = list(original)    
                ` },
                { lang: "python", code: `
                copied = original[:]    
                 ` },
                 
                
            ],

            

        
            heading: "9. Copying a List",
           
            content: `
             Using copy()  
             code1
             Using list()
             code2
             Using Slicing ([:])
             code3

            `,
            codes: [
                { lang: "python", code: `
                original = [1, 2, 3]
                copied = original.copy()
                print(copied)  # [1, 2, 3]    
                ` },
                { lang: "python", code: `
                copied = list(original)    
                ` },
                { lang: "python", code: `
                 copied = original[:]   
                ` },
                
            ],

           

        },
        {
            heading: "10. Checking Membership",
             
            content: `
             Use in or not in to check if an item exists in a list.
             code1

            `,
            codes: [
                { lang: "python", code: `
                 fruits = ["apple", "banana", "cherry"]
                 print("banana" in fruits)  # True
                 print("grape" not in fruits)  # True   
                ` },
                
            ],

            

        },
        {
            heading: "11. List Comprehensions (Advanced)",
             
            content: `
             List comprehensions are a concise way to create lists.<br><br>
             Example 1: Squaring Numbers
             code1
             Example 2: Filtering Even Numbers
             code2
             Example 3: Convert Strings to Uppercase
             code3

            
            `,
            codes: [
                { lang: "python", code: `
                 squares = [x**2 for x in range(1, 6)]
                 print(squares)  # [1, 4, 9, 16, 25]   
                ` },
                { lang: "python", code: `
                 evens = [x for x in range(10) if x % 2 == 0]
                 print(evens)  # [0, 2, 4, 6, 8]   
                ` },
                { lang: "python", code: `
                 words = ["hello", "world"]
                 uppercase_words = [word.upper() for word in words]
                 print(uppercase_words)  # ['HELLO', 'WORLD']   
                ` },
                
            ],


        },
        {
            heading: "Summary",
             
            content: `
             Lists are dynamic, ordered, and mutable.<br>
             Indexing and slicing let you access parts of a list.<br>
             You can modify, add, remove, and sort elements easily.<br>
             List comprehensions make list creation more efficient.<br>   
            `,
           

        },
        
            
        ]
    },
    {
        title: "CONDITIONAL STATEMENTS IN PYTHON!",
        sections: [
            
        {
            heading: "1. What is a Conditional Statement?",
             
            content: `
             A conditional statement is used to execute different blocks of code based on whether a condition is True or False.
             <br><br>
             Basic Syntax:
             code1
                
            `,
            codes: [
                { lang: "python", code: `
                if condition:
                    # Code runs if condition is True
                elif another_condition:
                    # Runs if first condition is False but this one is True
                else:
                    # Runs if all conditions are False
                ` },
                
            ],

        },
        {
            heading: "2. if Statement",
             
            content: `
             Executes a block of code only if the condition is True.   
            `,
            codes: [
                { lang: "python", code: `
                age = 18
                if age >= 18:
                    print("You are an adult.")
                ` },
                
            ],

        },
        {
            heading: "3. if-else Statement",
             
            content: `
             Executes one block if the condition is True and another block if it's False.   
            `,
            codes: [
                { lang: "python", code: `
                age = 16
                if age >= 18:
                    print("You can vote.")
                else:
                    print("You are too young to vote.")
                
                ` },
                
            ],

        },
        {
            heading: "4. if-elif-else Statement",
             
            content: `
             Checks multiple conditions in sequence.
             code1
             If the first condition is True, others are ignored.<br>
             If all conditions are False, the else block runs.<br>   
            `,
            codes: [
                { lang: "python", code: `
                marks = 85
                
                if marks >= 90:
                    print("Grade: A")
                elif marks >= 75:
                    print("Grade: B")
                elif marks >= 50:
                    print("Grade: C")
                else:
                    print("Grade: F")
                ` },
                
            ],

        },
        {
            heading: "5. Nested if Statements",
             
            content: `
             An if statement inside another if.   
            `,
            codes: [
                { lang: "python", code: `
                age = 20
                has_id = True
                
                if age >= 18:
                    if has_id:
                        print("You can enter the club.")
                    else:
                        print("You need an ID.")
                else:
                    print("You are too young.")
                ` },
                
            ],

        },
        {
            heading: "6. Short-Hand if Statement (Ternary Operator)",
             
            content: `
             A one-line if-else.   
            `,
            codes: [
                { lang: "python", code: `
                age = 18
                status = "Adult" if age >= 18 else "Minor"
                print(status)  # Adult
                ` },
                
            ],

        },
        {
            heading: "7. Logical Operators in Conditions",
             
            content: `
             Using and, or, and not   
            `,
            codes: [
                { lang: "python", code: `
                age = 25
                has_ticket = True
                
                if age >= 18 and has_ticket:
                    print("You can enter the movie.")  # ✅ Both conditions must be True
                
                if age < 18 or has_ticket:
                    print("You may enter.")  # ✅ At least one condition must be True
                
                if not has_ticket:
                    print("You need a ticket.")  # ✅ Executes if has_ticket is False
                ` },
                
            ],

        },
        {
            heading: "8. Comparing Values (==, !=, >, <, >=, <=)",
             
            content: `
                code1
            `,
            codes: [
                { lang: "python", code: `
                x = 10
                y = 20
                
                if x == y:
                    print("Equal")
                elif x != y:
                    print("Not equal")
                elif x > y:
                    print("x is greater")
                elif x < y:
                    print("x is smaller")
                ` },
                
            ],

        },
        {
            heading: "9. Checking Membership (in, not in)",
             
            content: `
             Used for checking if a value exists in a list, tuple, or string.   
            `,
            codes: [
                { lang: "python", code: `
                fruits = ["apple", "banana", "cherry"]
                
                if "banana" in fruits:
                    print("Banana is in the list.")
                
                if "grape" not in fruits:
                    print("Grape is not in the list.")
                ` },
                
            ],

        },
        {
            heading: "10. Checking Identity (is, is not)",
             
            content: `
             Used to compare if two variables point to the same object in memory.   
            `,
            codes: [
                { lang: "python", code: `
                x = [1, 2, 3]
                y = x
                z = [1, 2, 3]
                
                print(x is y)  # True (same memory location)
                print(x is z)  # False (different memory locations)
                print(x == z)  # True (same values)
                ` },
                
            ],

        },
        {
            heading: "11. Combining Conditions with Parentheses",
             
            content: `
             Parentheses help in complex conditions.   
            `,
            codes: [
                { lang: "python", code: `
                age = 20
                income = 5000
                
                if (age >= 18 and age <= 65) and (income > 3000):
                    print("Eligible for loan.")
                ` },
                
            ],

        },
        {
            heading: "12. pass Statement in if",
             
            content: `
             pass is a placeholder for future code.   
            `,
            codes: [
                { lang: "python", code: `
                x = 10
                
                if x > 5:
                    pass  # No error, but nothing happens
                
                print("Code continues...")
                ` },
                
            ],

        },
        {
            heading: "13. match-case (Python 3.10+)",
             
            content: `
             Like a switch-case in other languages.   
            `,
            codes: [
                { lang: "python", code: `
                status_code = 404
                
                match status_code:
                    case 200:
                        print("OK")
                    case 404:
                        print("Not Found")
                    case 500:
                        print("Server Error")
                    case _:
                        print("Unknown Error")  # Default case
                ` },
                
            ],

        },
        {
            heading: "14. Best Practices",
             
            content: `
            Use meaningful conditions
            code1
            ❌ Avoid unnecessary else blocks
            code2
            Use elif for multiple conditions <br>
            ❌ Avoid multiple if statements  
            code3 
            `,
            codes: [
                { lang: "python", code: `
                if is_logged_in:  # ✅ Readable
                if status == "active":  # ✅ Clear
                ` },
                { lang: "python", code: `
                if age >= 18:
                    print("Adult")  # ✅ No need for else
                else:
                    pass  # ❌ Unnecessary else
                ` },
                { lang: "python", code: `
                # ❌ Inefficient
                if marks >= 90:
                    print("A")
                if marks >= 75:
                    print("B")
                
                # ✅ Correct
                if marks >= 90:
                    print("A")
                elif marks >= 75:
                    print("B")
                ` },
                
            ],

        },
        {
            heading: "Summary",
             
            content: `
             if, if-else, and if-elif-else help control program flow.<br>
             Logical (and, or, not), membership (in, not in), and identity (is, is not) operators enhance conditions.<br>
             Short-hand if (?: in other languages) makes code concise.<br>
             match-case is useful for pattern matching (Python 3.10+).<br>
             Best practices help write cleaner and more efficient code.<br> 
            `,
            

        },
            
        ]
    },
    {
        title: "LOOPS IN PYTHON",
        sections: [
            
        {
            heading: " types of loops:",
          
            content: `
              Loops allow us to execute a block of code multiple times. Python provides two main types of loops:
              <br><br>
              1. for loop (Iterates over sequences like lists, tuples, dictionaries, or ranges)
              <br><br>
              2. while loop (Repeats as long as a condition remains True)  
            `,
            
        },
        {
            heading: "1. for Loop",
            video: "", 
            content: `
             Used for iterating over sequences (lists, tuples, dictionaries, strings, sets).<br><br>
             Basic Syntax
             code1
             Example 1: Looping through a List
             code2   
             Example 2: Looping through a String
             code3
             Example 3: Using range()<br><br>
             range(start, stop, step) generates numbers.
             code4

             Example 4: Looping in Reverse
             code5
            `,
            codes: [
                { lang: "python", code: `
                for item in sequence:
                    # Execute code
                ` },
                { lang: "python", code: `
                fruits = ["apple", "banana", "cherry"]
                for fruit in fruits:
                    print(fruit)
                ` },
                { lang: "python", code: `
                word = "Python"
                for letter in word:
                    print(letter)
                ` },
                { lang: "python", code: `
                for i in range(5):  # Default start = 0, step = 1
                    print(i)  # 0, 1, 2, 3, 4
                
                for i in range(2, 10, 2):  # start=2, stop=10, step=2
                    print(i)  # 2, 4, 6, 8
                ` },
                { lang: "python", code: `
                for i in range(10, 0, -2):
                    print(i)  # 10, 8, 6, 4, 2
                ` },
                
                
            ],

            

        },
        {
            heading: "2. while Loop",
          
            content: `
             Executes a block as long as a condition is True.
             Basic Syntax
             code1
             Example 1: Counting
             code2
             Example 2: Loop Until User Input
             code3
             Example 3: Infinite Loop (Use with Caution)
             code4
             Press Ctrl+C to stop an infinite loop.


            `,
            codes: [
                { lang: "python", code: `
                while condition:
                    # Execute code
                ` },
                { lang: "python", code: `
                i = 1
                while i <= 5:
                    print(i)
                    i += 1
                ` },
                { lang: "python", code: `
                password = ""
                while password != "1234":
                    password = input("Enter password: ")
                print("Access granted!")
                ` },
                { lang: "python", code: `
                while True:
                    print("This will run forever.")
                ` },
                
            ],


        },
        {
            heading: "3. Loop Control Statements",
             
            content: `
             <strong>1. <strong>break</strong> (Exit the loop)</strong>
             <br><br>
             Stops the loop immediately.
             code1
             code2
             2. <strong>continue</strong> (Skip the current iteration)
             <br><br>
             Skips the rest of the code for that iteration.
             code3
             3. <strong>pass</strong> (Placeholder)
             <br><br>
             Does nothing but avoids syntax errors.
             code4


             
            `,
            codes: [
                { lang: "python", code: `
                for num in range(10):
                    if num == 5:
                        break  # Exits loop when num == 5
                    print(num)  # Prints 0, 1, 2, 3, 4
                ` },
                { lang: "python", code: `
                i = 1
                while i <= 10:
                    if i == 5:
                        break  # Exits loop
                    print(i)
                    i += 1
                ` },
                { lang: "python", code: `
                for num in range(5):
                    if num == 2:
                        continue  # Skips printing 2
                    print(num)  # Prints 0, 1, 3, 4
                ` },
                { lang: "python", code: `
                for num in range(5):
                    if num == 3:
                        pass  # Placeholder for future code
                    print(num)
                ` },
                
            ],

           

        },
        {
            heading: "4. Nested Loops",
            
            content: `
             A loop inside another loop. 
             <br><br>
             Example 1: Multiplication Table
             code1
             Example 2: Looping through a List of Lists
             code2

            `,
            codes: [
                { lang: "python", code: `
                for i in range(1, 4):
                    for j in range(1, 4):
                        print(f"{i} × {j} = {i * j}")
                ` },
                { lang: "python", code: `
                matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
                
                for row in matrix:
                    for num in row:
                        print(num, end=" ")
                    print()
                ` },
                
            ],

            

        },
        {
            heading: "5. Looping Through Dictionaries",
            
            content: `
             Looping Through Keys
             code1
             Looping Through Values
             code2
             Looping Through Key-Value Pairs
             code3

            `,
            codes: [
                { lang: "python", code: `
                student = {"name": "John", "age": 21, "grade": "A"}
                
                for key in student:
                    print(key, ":", student[key])
                ` },
                { lang: "python", code: `
                for value in student.values():
                    print(value)
                ` },
                { lang: "python", code: `
                for key, value in student.items():
                    print(f"{key} → {value}")
                ` },
                
            ],

            

        },
        {
            heading: "6. List Comprehension (Advanced <strong>for</strong> Loop)",
           
            content: `
             List comprehension provides a shorter way to create lists.
             <br><br>
             Example 1: Squaring Numbers
             code1
             Example 2: Filtering Even Numbers
             code2
             Example 3: Converting Strings to Uppercase
             code3

            `,
            codes: [
                { lang: "python", code: `
                squares = [x ** 2 for x in range(1, 6)]
                print(squares)  # [1, 4, 9, 16, 25]
                ` },
                { lang: "python", code: `
                evens = [x for x in range(10) if x % 2 == 0]
                print(evens)  # [0, 2, 4, 6, 8]
                ` },
                { lang: "python", code: `
                words = ["hello", "world"]
                uppercase_words = [word.upper() for word in words]
                print(uppercase_words)  # ['HELLO', 'WORLD']
                ` },
                
            ],

            

        },
        {
            heading: "7. <strong>else</strong> in Loops",
            
            content: `
             Loops can have an <strong>else</strong> block that runs only if the loop
             <br><br> 
             completes without <strong>break.</strong>
             code1
             code2
               
            `,
            codes: [
                { lang: "python", code: `
                for num in range(5):
                    print(num)
                else:
                    print("Loop finished.")
                ` },
                { lang: "python", code: `
                i = 0
                while i < 3:
                    print(i)
                    i += 1
                else:
                    print("Loop completed.")
                ` },
                
            ],

            

        },
        {
            heading: "8. Performance Optimization in Loops",
            
            content: `
             1. Using <strong>enumerate()</strong> Instead of <strong>range(len())</strong>
             code1
             2. Using <strong>zip()</strong> for Parallel Iteration
             code2
             3. Avoiding Unnecessary Loops
             code3

            `,
            codes: [
                { lang: "python", code: `
                names = ["Alice", "Bob", "Charlie"]
                for index, name in enumerate(names):
                    print(f"{index}: {name}")
                ` },
                { lang: "python", code: `
                names = ["Alice", "Bob", "Charlie"]
                ages = [25, 30, 35]
                
                for name, age in zip(names, ages):
                    print(f"{name} is {age} years old.")
                ` },
                { lang: "python", code: `
                # Bad: Using loop for sum
                numbers = [1, 2, 3, 4, 5]
                total = 0
                for num in numbers:
                    total += num
                print(total)  # 15
                
                # Good: Using built-in sum()
                print(sum(numbers))  # 15
                ` },
                
            ],

            

        },
        {
            heading: "Summary",
             
            content: `
             <strong>for loops</strong> iterate over sequences.<br><br>
             <strong>while loops</strong> run until a condition becomes <strong>False</strong>.<br><br>
             Loop control statements <strong>(break, continue, pass)</strong> manage flow.<br><br>
             List comprehensions create lists efficiently.<br><br>
             <strong>else</strong> in loops runs if no break occurs.<br><br>
             Optimization techniques make loops faster. <br><br>  
            `,
            

        },
        
            
        ]
    },














    {
        title: "",
        sections: [
            
        {
            heading: "",
            video: "", 
            content: `
                
            `,
            codes: [
                { lang: "python", code: `
                
                ` },
                
            ],

            images: [
                    "images/facebook.png",
                ]

        },
            
        ]
    },

];