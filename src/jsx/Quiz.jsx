import React, { PropTypes } from 'react';
import Questions from './Questions.jsx';
import AnswerList from './AnswerList.jsx';
import Score from './Score.jsx';
import Progress from './Progress.jsx';
import Timer from './Timer.jsx';
import Completed from './Completed.jsx'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import '../App.css';

class Quiz extends React.Component {
    constructor() {
        super();
        // this.state = { time: {}, seconds: 1 };
        this.timer = 0;
      //   this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.state = this.getInitialState();
        this.checkAnswer = this.checkAnswer.bind(this);
        this.checAnswer = this.checAnswer.bind(this);
        this.resetQuiz = this.resetQuiz.bind(this);
    }
     
    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
    
      componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
      }
    
      componentWillMount() {
        if (this.timer == 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds == 0) { 
          clearInterval(this.timer);
        }
      }


    getInitialState() {
        return {
            questionData: [
                {id:1,question: "This is the capital of which country? Canberra", answers: ["Turkey","Australia","Cuba","Algeria"], correct: 1},
                {id:2,question: "This is the capital of which country? Bangkok", answers: ["Argentina","Thailand","India","United Kingdom"], correct: 1},
                {id:3,question: "This is the capital of which country? Bangkok", answers: ["Argentina","Thailand","India","United Kingdom"], correct: 1},
                {id:4,question: "This is the capital of which country? Bangkok", answers: ["Argentina","Thailand","India","United Kingdom"], correct: 1}],
                
            progress: 0,
            score: 0,time: {}, seconds: 15,ul:true
        };
    }

    checkAnswer(index) {
        console.log(index);
        var correct = this.state.questionData[this.state.progress].correct;
        var newScore = 0, newProgress = 0;
        if (correct === index) {
            newScore = this.state.score + 1;
            this.setState({score: newScore});
            newProgress = this.state.progress + 1;
            this.setState({progress: newProgress});
        } else {
            newProgress = this.state.progress + 1;
            this.setState({progress: newProgress});
        }
    }
    checAnswer(index) {
        var correct = this.state.questionData[this.state.progress].correct;
        var newScore = this.state.score;
        if (correct === index && newScore<4 && this.state.progress==3) {
            newScore = this.state.score + 1;
            this.setState({score: newScore});
        } else {
          
            return false;
        }
    }
    

    resetQuiz() {
        this.setState({score: 0, progress: 0,seconds:0});
        clearInterval(this.timer)
    }
 

    render() {
        var myStyle = {
          
            listStyleType: "none",
            color:'white',
    
            
       }
        var currentQuestion = this.state.questionData[this.state.progress];
        if(this.state.questionData[this.state.progress].id<= 3 && this.state.time.s!=0) {
            return (
                <div className="quiz container">
                    <Questions questionText={currentQuestion.question} />
                    <AnswerList answers={currentQuestion.answers} answerCallback={this.checkAnswer} />
                    <Score score={this.state.score} />
                    <Progress progress={this.state.progress} total={this.state.questionData.length}/>
                   <p>{this.state.time.s}</p>
                </div>
            );
        }
        else if(this.state.questionData[this.state.progress].id== 4 && this.state.time.s!=0) {
            return (
                // <Router>
                <div className="quiz container">
                 {/* <ul style={myStyle}> */}
                   <Questions questionText={currentQuestion.question} />
                   <AnswerList answers={currentQuestion.answers} answerCallback={this.checAnswer} />
                   <Score score={this.state.score} />
                   <Progress progress={this.state.progress} total={this.state.questionData.length}/>
                    {/* <button className="quiz reset-btn" onClick={this.resetQuiz}>submit</button> */}
                  
{/* //                   <li><Link to={'/Completed'}style={{color:"#fff"}}className="quiz reset-btn">Submit</Link></li>
//                </ul>
//                <Switch>
//                   <Route exact path='/Completed' component={Completed} />
//                </Switch>*/}
                   <p>{this.state.time.s}</p> 
            </div>
//                 </Router>
            );
        }
         else {
            return (
                <div className="quiz container">
                    <p className="quiz question">Time Out!</p>
                    <Score score={this.state.score} />
                    {/* <button className="quiz reset-btn" onClick={this.resetQuiz}>Reset Quiz</button> */}
                </div>
            );
        }
    }
}

export default Quiz;