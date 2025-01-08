import React, { useState, useEffect } from "react";
import ModelTest from "../../models/ModelTest";
import ModelQuestion from "../../models/ModelQuestion";
import Tests from "../../services/Tests";
import Questions from "../../services/Questions";
import "../styles/professeur/CreaTest.css";

const initialTest: ModelTest = {
  id: 0,
  title: "",
  dificulty: "",
  study: "",
};

const initialQuestions: ModelQuestion[] = Array.from({ length: 5 }, () => ({
  id: 0,
  title: "",
  p1: "",
  p2: "",
  p3: "",
  p4: "",
  pr: "",
  test: { id: 0 },
}));

export default function CreaTest() {
  const [test, setTest] = useState<ModelTest>(() => {
    const savedTest = localStorage.getItem("test");
    return savedTest ? JSON.parse(savedTest) : initialTest;
  });

  const [questions, setQuestions] = useState<ModelQuestion[]>(() => {
    const savedQuestions = localStorage.getItem("questions");
    return savedQuestions ? JSON.parse(savedQuestions) : initialQuestions;
  });

  // useEffect(() => {
  //   localStorage.setItem("test", JSON.stringify(test));
  // }, [test]);

  // useEffect(() => {
  //   localStorage.setItem("questions", JSON.stringify(questions));
  // }, [questions]);

  const handleTestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTest((prevTest) => ({ ...prevTest, [name]: value }));
  };

  const handleQuestionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, [name]: value } : question
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdTest = await Tests.Create(test);
      const testId = createdTest.id;

      const questionsWithTestId = questions.map((question) => ({
        ...question,
        test: { id: testId },
        pr: question.pr || question.p1,
      }));

      for (const question of questionsWithTestId) {
        await Questions.Create(question);
      }

      alert("Test créé avec succès!");
    } catch (error) {
      console.error(
        "Erreur lors de la création du test et des questions:",
        error
      );
    }
  };

  return (
    <div className="create-test-container">
      <h1 className="create-test-title">Créer un Test</h1>
      <form onSubmit={handleSubmit} className="create-test-form">
        <div className="test-group">
          <div className="form-group">
            <label className="form-label">Titre du Test:</label>
            <input
              type="text"
              name="title"
              value={test.title}
              onChange={(e) => handleTestChange(e)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Difficulté:</label>
            <select
              name="dificulty"
              value={test.dificulty}
              onChange={(e) => handleTestChange(e)}
              className="form-select"
              required
            >
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Étude:</label>
            <select
              name="study"
              value={test.study}
              onChange={(e) => handleTestChange(e)}
              className="form-select"
              required
            >
              <option value="GEA">GEA</option>
              <option value="TC">TC</option>
              <option value="MMI">MMI</option>
            </select>
          </div>
        </div>
        {questions.map((question, index) => (
          <div key={index} className="question-group">
            <h3 className="question-title">Question {index + 1}</h3>
            <div className="form-group">
              <label className="form-label">Titre:</label>
              <input
                type="text"
                name="title"
                value={question.title}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Réponse 1:</label>
              <input
                type="text"
                name="p1"
                value={question.p1}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Réponse 2:</label>
              <input
                type="text"
                name="p2"
                value={question.p2}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Réponse 3:</label>
              <input
                type="text"
                name="p3"
                value={question.p3}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Réponse 4:</label>
              <input
                type="text"
                name="p4"
                value={question.p4}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bonne Réponse:</label>
              <select
                name="pr"
                value={question.pr}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="form-select"
              >
                <option value={question.p1}>{question.p1}</option>
                <option value={question.p2}>{question.p2}</option>
                <option value={question.p3}>{question.p3}</option>
                <option value={question.p4}>{question.p4}</option>
              </select>
            </div>
          </div>
        ))}
        <button type="submit" className="submit-button">
          Créer le Test
        </button>
      </form>
    </div>
  );
}
