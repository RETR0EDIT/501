import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Questions from "../../services/Questions";
import Answers from "../../services/Answers";
import Rates from "../../services/Rates"; // Assurez-vous d'importer le service Rates
import ModelQuestion from "../../models/ModelQuestion";
import ModelAnswers from "../../models/ModelAnswers";
import ModelRate from "../../models/ModelRate";
import "../styles/visiteur/TemplateTest.css";

const TemplateTest: React.FC = () => {
  const { idTest } = useParams<{ idTest: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { testName } = location.state as { testName: string };
  const [questions, setQuestions] = useState<ModelQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<ModelAnswers[]>([]);
  const [isTestAlreadyDone, setIsTestAlreadyDone] = useState<boolean>(false);
  const [verifiedAnswers, setVerifiedAnswers] = useState<ModelAnswers[]>([]);

  useEffect(() => {
    const checkDevTools = () => {
      const devToolsOpened =
        window.outerWidth - window.innerWidth > 100 ||
        window.outerHeight - window.innerHeight > 100;
      const answerElement = document.querySelector(".answer p");
      if (devToolsOpened && answerElement) {
        answerElement.remove();
      }
    };

    window.addEventListener("resize", checkDevTools);
    checkDevTools();

    return () => {
      window.removeEventListener("resize", checkDevTools);
    };
  }, []);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      try {
        console.log(`Récupération des questions pour le test ${idTest}`);
        const response = await Questions.Read(idTest);
        console.log("Réponse de l'API pour les questions:", response);

        if (Array.isArray(response)) {
          // Supprimer la propriété 'pr' de chaque question
          const filteredQuestions = response.map((question) => {
            const { pr, ...filteredQuestion } = question;
            return filteredQuestion;
          });
          setQuestions(filteredQuestions);
        } else {
          setError("La réponse de l'API n'est pas un tableau.");
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("ID utilisateur non trouvé dans le local storage");
          return;
        }

        const userAnswersResponse = await Answers.ReadByUserId(userId);
        console.log(
          "Réponse de l'API pour les réponses de l'utilisateur:",
          userAnswersResponse
        );

        if (Array.isArray(userAnswersResponse)) {
          const testAnswers = userAnswersResponse.filter(
            (answer) => answer.question.test.id === parseInt(idTest!)
          );
          setUserAnswers(testAnswers);

          const answeredQuestionsIds = testAnswers.map(
            (answer) => answer.question.id
          );
          const allQuestionsAnswered = response.every((question) =>
            answeredQuestionsIds.includes(question.id)
          );

          if (allQuestionsAnswered) {
            setIsTestAlreadyDone(true);
          } else {
            // Passer à la première question non répondue
            const firstUnansweredQuestionIndex = response.findIndex(
              (question) => !answeredQuestionsIds.includes(question.id)
            );
            setCurrentQuestionIndex(firstUnansweredQuestionIndex);
          }
        } else {
          setError(
            "La réponse de l'API pour les réponses de l'utilisateur n'est pas un tableau."
          );
        }
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des questions et des réponses:",
          err
        );
        setError(
          "Erreur lors de la récupération des questions et des réponses."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAndAnswers();
  }, [idTest]);

  useEffect(() => {
    const fetchVerifiedAnswers = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("ID utilisateur non trouvé dans le local storage");
        return;
      }

      try {
        const verifiedAnswersResponse = await Answers.ReadByUserId(userId);
        const testAnswers = verifiedAnswersResponse.filter(
          (answer) => answer.question.test.id === parseInt(idTest!)
        );
        setVerifiedAnswers(testAnswers);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des réponses vérifiées:",
          err
        );
      }
    };

    if (isTestFinished) {
      fetchVerifiedAnswers();
    }
  }, [isTestFinished, idTest]);

  const handleAnswerClick = async (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswered(true);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("ID utilisateur non trouvé dans le local storage");
      return;
    }

    const answer: ModelAnswers = {
      id: 0,
      content: selectedAnswer,
      isvalid: false,
      account: { id: parseInt(userId) },
      question: { id: currentQuestion.id },
    };

    try {
      console.log("Enregistrement de la réponse:", answer);
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
      handleFinishTest();
    }
  };

  const handleFinishTest = async () => {
    console.log("Test terminé !");
    setIsTestFinished(true);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("ID utilisateur non trouvé dans le local storage");
      return;
    }

    const rate: ModelRate = {
      id: 0,
      account: { id: parseInt(userId) },
      test: { id: parseInt(idTest!) },
      note: "0",
    };

    try {
      console.log("Enregistrement de la note:", rate);
      await Rates.Create(rate);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de la note:", err, JSON.stringify(rate));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="loading">Chargement des questions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isTestAlreadyDone) {
    return (
      <div className="test-already-done">
        <h1 className="test-already-done-title">Test déjà fait !</h1>
        <h2 className="test-already-done-subtitle">Vos réponses :</h2>
        <ul className="test-already-done-list">
          {userAnswers.map((answer, index) => (
            <li key={index} className="test-already-done-item">
              Question {answer.question.id}: {answer.content} -{" "}
              {answer.isvalid ? "Correct" : "Incorrect"}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isTestFinished) {
    return (
      <div className="test-finished">
        <h1 className="test-finished-title">Test terminé !</h1>
        <h2 className="test-finished-subtitle">Récapitulatif des réponses :</h2>
        <ul className="test-finished-list">
          {verifiedAnswers.map((answer, index) => (
            <li key={index} className="test-finished-item">
              Question {answer.question.id}: {answer.content} -{" "}
              {answer.isvalid ? "Correct" : "Incorrect"}
            </li>
          ))}
        </ul>
        <a
          href="http://localhost:5173/visiteur/probleme"
          className="finish-button"
          onClick={handleFinishTest}
        >
          Terminer
        </a>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="test-container">
      <h2 className="question-title">{testName}</h2>
      <div className="answers-container">
        <div className="answer">
          <p style={{ userSelect: "none" }}>{currentQuestion.title}</p>
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
          <button
            className="answer-button"
            id="answer-4"
            onClick={() => handleAnswerClick(currentQuestion.p4)}
            disabled={answered}
          >
            <img src="/losange.svg" alt="losange" />
            <p>{currentQuestion.p4}</p>
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