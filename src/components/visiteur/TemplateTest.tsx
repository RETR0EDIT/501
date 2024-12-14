import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Questions from "../../services/Questions";
import Answers from "../../services/Answers"; // Importez le service pour gérer les réponses
import ModelQuestion from "../../models/ModelQuestion";
import ModelAnswers from "../../models/ModelAnswers"; // Importez l'interface ModelAnswers
import "../styles/visiteur/TemplateTest.css";

const TemplateTest: React.FC = () => {
  const { idTest } = useParams<{ idTest: string }>();
  const location = useLocation();
  const { testName } = location.state as { testName: string };
  const [questions, setQuestions] = useState<ModelQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<ModelAnswers[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await Questions.Read(idTest);
        if (Array.isArray(response)) {
          setQuestions(response);
        } else {
          setError("La réponse de l'API n'est pas un tableau.");
        }
      } catch (err) {
        setError("Erreur lors de la récupération des questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [idTest]);

  const handleAnswerClick = async (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswered(true);
    const isCorrect = selectedAnswer === currentQuestion.pr;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("ID utilisateur non trouvé dans le local storage");
      return;
    }

    const answer: ModelAnswers = {
      id: 0,
      content: selectedAnswer,
      correct: isCorrect,
      account: { id: parseInt(userId) },
      question: { id: currentQuestion.id },
    };

    try {
      await Answers.Create(answer);
      setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de la réponse:", err);
    }
  };

  const handleNextQuestion = () => {
    setAnswered(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsTestFinished(true);
    }
  };

  const handleFinishTest = async () => {
    console.log("Test terminé !");
  };

  if (loading) {
    return <div className="loading">Chargement des questions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isTestFinished) {
    return (
      <div className="test-finished">
        <h1>Test terminé !</h1>
        <h2>Récapitulatif des réponses :</h2>
        <ul>
          {userAnswers.map((answer, index) => (
            <li key={index}>
              Question {answer.question.id}: {answer.content} -{" "}
              {answer.correct ? "Correct" : "Incorrect"}
            </li>
          ))}
        </ul>
        <button className="finish-button" onClick={handleFinishTest}>
          Terminer
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="test-container">
      <h2 className="question-title">{testName}</h2>
      <div className="answers-container">
        <div className="answer">
          <p>{currentQuestion.title}</p>
        </div>
        <div className="answer-buttons">
          <button
            className="answer-button"
            id="answer-1"
            onClick={() => handleAnswerClick(currentQuestion.p1)}
            disabled={answered}
          >
            <img src="/carre.svg" alt="carre" />
            <p>{currentQuestion.p1}</p>
          </button>
          <button
            className="answer-button"
            id="answer-2"
            onClick={() => handleAnswerClick(currentQuestion.p2)}
            disabled={answered}
          >
            <img src="/triangle.svg" alt="triangle" />
            <p>{currentQuestion.p2}</p>
          </button>
          <button
            className="answer-button"
            id="answer-3"
            onClick={() => handleAnswerClick(currentQuestion.p3)}
            disabled={answered}
          >
            <img src="/rond.svg" alt="rond" />
            <p>{currentQuestion.p3}</p>
          </button>
        </div>
      </div>
      {answered && (
        <div className="feedback">
          <button className="next-button" onClick={handleNextQuestion}>
            Question suivante
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateTest;
