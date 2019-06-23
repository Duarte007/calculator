import React, {Component} from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    currentPositionValue: 0
}

export default class Calculator extends Component{

    state = {...initialState};

    constructor(props){
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.makeOperation = this.makeOperation.bind(this);
        this.clearDigit = this.clearDigit.bind(this);
    }

    clearMemory(){
        this.setState({...initialState})
    }

    clearDigit(){
        let values = [...this.state.values];
        let i = this.state.currentPositionValue;
        let number = values[i].toString().split('');
        let length = number.length - 1;
        number.splice(length, 1);
        values[i] = parseFloat(number.join(''));
        this.setState({ displayValue: values[i], values});
    }

    setOperation(operation){
        if(this.state.currentPositionValue === 0){
            this.setState({operation, currentPositionValue: 1, clearDisplay: true});
        } else {
            this.makeOperation(operation);
        }
    }

    makeOperation(operation){
        const values = [...this.state.values];
        const currentOperation = this.state.operation;
        const equals = operation === '=';

        switch(currentOperation){
            case '+':
                values[0] = values[0] + values[1];
                break;
                
            case '-':
                values[0] = values[0] - values[1];
                break;
                
            case '*':
                values[0] = values[0] * values[1];
                break;
                
            case '/':
                values[0] = values[0] / values[1];
                break;

            default:
                break;
        }

        values[1] = 0;

        this.setState({
            displayValue: values[0],
            operation: equals ? null : operation,
            currentPositionValue: equals ? 0 : 1,
            clearDisplay: !equals,
            values
        })
    }

    addDigit(n){

        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({displayValue, clearDisplay: false});

        if(n !== '.'){
            const i = this.state.currentPositionValue;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
            console.log(values);
        }
    }

    render(){
        return (
            <div className="calculator">
            <Display value={this.state.displayValue}/>
            <Button label="AC" click={this.clearMemory} double/>
            <Button label="C" click={this.clearDigit}/>
            <Button label="/" click={this.setOperation} operation/>
            <Button label="7" click={this.addDigit}/>
            <Button label="8" click={this.addDigit}/>
            <Button label="9" click={this.addDigit}/>
            <Button label="*" click={this.setOperation} operation/>
            <Button label="4" click={this.addDigit}/>
            <Button label="5" click={this.addDigit}/>
            <Button label="6" click={this.addDigit}/>
            <Button label="-" click={this.setOperation} operation/>
            <Button label="1" click={this.addDigit}/>
            <Button label="2" click={this.addDigit}/>
            <Button label="3" click={this.addDigit}/>
            <Button label="+" click={this.setOperation} operation/>
            <Button label="0" click={this.addDigit} double/>
            <Button label="." click={this.addDigit}/>
            <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}
