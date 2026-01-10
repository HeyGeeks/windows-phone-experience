import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import './Calculator.css';

export function Calculator() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
    };

    const performOperation = (nextOperation) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            let result;

            switch (operation) {
                case '+': result = currentValue + inputValue; break;
                case '-': result = currentValue - inputValue; break;
                case '×': result = currentValue * inputValue; break;
                case '÷': result = inputValue !== 0 ? currentValue / inputValue : 'Error'; break;
                default: result = inputValue;
            }

            setDisplay(String(result));
            setPreviousValue(result);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    const calculate = () => {
        if (!operation || previousValue === null) return;

        performOperation(null);
        setPreviousValue(null);
        setOperation(null);
    };

    const toggleSign = () => {
        setDisplay(String(parseFloat(display) * -1));
    };

    const percentage = () => {
        setDisplay(String(parseFloat(display) / 100));
    };

    return (
        <AppShell title="calculator">
            <div className="calculator">
                <div className="calc-display">
                    <div className="calc-display-value">{display}</div>
                </div>
                <div className="calc-buttons">
                    <button className="calc-btn func" onClick={clear}>C</button>
                    <button className="calc-btn func" onClick={toggleSign}>±</button>
                    <button className="calc-btn func" onClick={percentage}>%</button>
                    <button className="calc-btn op" onClick={() => performOperation('÷')}>÷</button>

                    <button className="calc-btn" onClick={() => inputDigit('7')}>7</button>
                    <button className="calc-btn" onClick={() => inputDigit('8')}>8</button>
                    <button className="calc-btn" onClick={() => inputDigit('9')}>9</button>
                    <button className="calc-btn op" onClick={() => performOperation('×')}>×</button>

                    <button className="calc-btn" onClick={() => inputDigit('4')}>4</button>
                    <button className="calc-btn" onClick={() => inputDigit('5')}>5</button>
                    <button className="calc-btn" onClick={() => inputDigit('6')}>6</button>
                    <button className="calc-btn op" onClick={() => performOperation('-')}>−</button>

                    <button className="calc-btn" onClick={() => inputDigit('1')}>1</button>
                    <button className="calc-btn" onClick={() => inputDigit('2')}>2</button>
                    <button className="calc-btn" onClick={() => inputDigit('3')}>3</button>
                    <button className="calc-btn op" onClick={() => performOperation('+')}>+</button>

                    <button className="calc-btn zero" onClick={() => inputDigit('0')}>0</button>
                    <button className="calc-btn" onClick={inputDecimal}>.</button>
                    <button className="calc-btn op equals" onClick={calculate}>=</button>
                </div>
            </div>
        </AppShell>
    );
}
