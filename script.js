 let display = document.getElementById('display');
        let currentInput = '0';
        let previousInput = null;
        let operation = null;
        let waitingForNewInput = false;

        // Create background numbers
        function createBackgroundNumbers() {
            const container = document.getElementById('backgroundNumbers');
            const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            
            for (let i = 0; i < 50; i++) {
                const numberEl = document.createElement('div');
                numberEl.className = 'bg-number';
                numberEl.textContent = numbers[Math.floor(Math.random() * numbers.length)];
                
                // Random positioning
                numberEl.style.left = Math.random() * 100 + '%';
                numberEl.style.top = Math.random() * 100 + '%';
                
                // Random size
                const size = Math.random() * 40 + 20;
                numberEl.style.fontSize = size + 'px';
                
                // Random animation delay
                numberEl.style.animationDelay = Math.random() * 6 + 's';
                
                container.appendChild(numberEl);
            }
        }

        function updateDisplay() {
            display.textContent = currentInput;
        }

        function inputNumber(num) {
            if (waitingForNewInput) {
                currentInput = num;
                waitingForNewInput = false;
            } else {
                currentInput = currentInput === '0' ? num : currentInput + num;
            }
            updateDisplay();
        }

        function inputDecimal() {
            if (waitingForNewInput) {
                currentInput = '0.';
                waitingForNewInput = false;
            } else if (currentInput.indexOf('.') === -1) {
                currentInput += '.';
            }
            updateDisplay();
        }

        function clearAll() {
            currentInput = '0';
            previousInput = null;
            operation = null;
            waitingForNewInput = false;
            clearOperatorHighlight();
            updateDisplay();
        }

        function toggleSign() {
            if (currentInput !== '0') {
                currentInput = currentInput.startsWith('-') 
                    ? currentInput.slice(1) 
                    : '-' + currentInput;
                updateDisplay();
            }
        }

        function percentage() {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        }

        function setOperation(op) {
            if (previousInput !== null && operation !== null && !waitingForNewInput) {
                calculate();
            }
            
            previousInput = currentInput;
            operation = op;
            waitingForNewInput = true;
            
            highlightOperator(op);
        }

        function calculate() {
            if (previousInput === null || operation === null) return;
            
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            let result;
            
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '×':
                    result = prev * current;
                    break;
                case '÷':
                    result = current !== 0 ? prev / current : 0;
                    break;
                default:
                    return;
            }
            
            currentInput = result.toString();
            previousInput = null;
            operation = null;
            waitingForNewInput = true;
            clearOperatorHighlight();
            updateDisplay();
        }

        function highlightOperator(op) {
            clearOperatorHighlight();
            const operators = {
                '+': 'add',
                '-': 'subtract',
                '×': 'multiply',
                '÷': 'divide'
            };
            
            if (operators[op]) {
                document.getElementById(operators[op]).classList.add('active');
            }
        }

        function clearOperatorHighlight() {
            document.querySelectorAll('.operator').forEach(btn => {
                btn.classList.remove('active');
            });
        }

        // Initialize
        createBackgroundNumbers();
        updateDisplay();
    