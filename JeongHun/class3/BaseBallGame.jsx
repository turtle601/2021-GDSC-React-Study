import Try from './Try';
const React = require('react');
const { Component } = React;


function getNumbers() {
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i<4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random()*(9-i)), 1)[0];
    array.push(chosen);
  }
  return array;
}



 
class BaseBallGame extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],

  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if(this.state.value == this.state.answer.join('')) {
        this.setState((prev)=>{
          return {
            result : "홈런",
            tries : [... prev.tries, {try : this.state.value, result :'홈런' }]
          }
        });
        alert('게임을 다시 시작합니다. ');
          this.setState({
            value : '',
            answer: getNumbers(),
            tries: [],
          });
    }  
    else {
        const answerArray = this.state.value.split('').map((v)=>parseInt(v));
        let strike = 0;
        let ball = 0;
        if(this.state.tries.length >= 9) {
          this.setState((prev)=>{
            return {
              result : `10번 넘게 틀려서 실패. 답은 ${this.state.answer.join(',')} 였습니다.`,
            }
          });
          alert('게임을 다시 시작합니다. ');

          this.setState((prev)=>{
            return {
              value : '',
              answer: getNumbers(),
              tries: [],
            }
          });
        }

        else {
          for(let i = 0; i < 4; i++) {
            if(answerArray[i] === this.state.answer[i]) {
              strike +=1;
            }
            else if(this.state.answer.includes(answerArray[i])) {
              ball+=1;
            }
          }
          this.setState((prev)=>{
            return {
              tries : [... prev.tries, {try : prev.value, result : `${strike} 스트라이크, ${ball} 볼 입니다.`}],
              value : '',
            }
          });
        }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value : e.target.value,
    });
  };


  render() {
      return (
        <>
          <h1>{this.state.result}</h1>
          <form onSubmit = {this.onSubmitForm}>
            <input maxLength = {4} value ={this.state.value} onChange = {this.onChangeInput} />
          </form>
          <div>시도 : {this.state.tries.length}</div>
          <ul>
            {this.state.tries.map((v, i)=>{
               return (
                 <Try key = {`${i+1}차 시도: `} tryInfo = {v} index = {i} />
               );
            })}
          </ul>
        </>
      );
  }
}

export default BaseBallGame;
