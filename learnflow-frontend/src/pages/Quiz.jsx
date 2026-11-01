import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMaterialById } from "../services/material.service.js";

const getCorrectAnswer = (question) =>
  question.options?.[question.correctAnswerIndex];

function Quiz() {
  const { videoId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMaterialById(videoId);

        if (isMounted) {
          setQuestions(data.quiz || []);
          setCurrentQuestion(0);
          setAnswers({});
          setSubmitted(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load quiz.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchQuiz();

    return () => {
      isMounted = false;
    };
  }, [videoId]);

  // Calculate score
  const score = questions.reduce((total, question, index) => {
    return total + (
      answers[index] !== undefined &&
      answers[index] === getCorrectAnswer(question)
        ? 1
        : 0
    );
  }, 0);

  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  // Select an answer
  const handleAnswer = (option) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  // Retry quiz
  const handleRetry = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setSubmitted(false);
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center gap-5">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />

        <h2 className="text-lg font-semibold text-white">
          Preparing your quiz...
        </h2>

        <p className="text-sm text-gray-500">
          Getting your questions ready.
        </p>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Unable to load quiz
          </h2>

          <p className="mt-4 text-sm text-gray-400">
            {error}
          </p>

          <Link
            to={`/materials/${videoId}`}
            className="mt-7 inline-block rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            Back to Materials
          </Link>
        </div>
      </div>
    );
  }

  // No questions available
  if (!questions.length) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h2 className="text-2xl font-bold">
            No Quiz Available
          </h2>

          <p className="mt-4 text-sm text-gray-400">
            There are no quiz questions available for this video.
          </p>

          <Link
            to={`/materials/${videoId}`}
            className="mt-7 inline-block rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            Back to Materials
          </Link>
        </div>
      </div>
    );
  }

  // RESULT SCREEN
  if (submitted) {
    return (
      <div className="min-h-[75vh] px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-2xl">

          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-[#15112b] to-indigo-950/80 p-8 text-center sm:p-12">

            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-violet-500/20 blur-[90px]" />

            <div className="relative">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/15 text-4xl">
                {percentage >= 80 ? "🏆" : percentage >= 50 ? "🎯" : "📚"}
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">
                Quiz Completed
              </p>

              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                {percentage >= 80
                  ? "Excellent Work!"
                  : percentage >= 50
                    ? "Good Effort!"
                    : "Keep Practicing!"}
              </h1>

              <p className="mt-3 text-sm text-gray-400">
                You've completed your learning challenge.
              </p>

              {/* Score */}
              <div className="mx-auto my-10 flex h-44 w-44 flex-col items-center justify-center rounded-full border-[8px] border-violet-500/30 bg-violet-500/10">
                <span className="text-5xl font-extrabold text-white">
                  {percentage}%
                </span>

                <span className="mt-2 text-sm text-gray-400">
                  Your Score
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-bold text-white">
                    {questions.length}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Total
                  </p>
                </div>

                <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                  <p className="text-2xl font-bold text-green-400">
                    {score}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Correct
                  </p>
                </div>

                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <p className="text-2xl font-bold text-red-400">
                    {questions.length - score}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Incorrect
                  </p>
                </div>

              </div>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                <button
                  onClick={handleRetry}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold transition hover:scale-105"
                >
                  Retry Quiz ↻
                </button>

                <Link
                  to={`/materials/${videoId}`}
                  className="rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/5"
                >
                  Back to Materials
                </Link>

              </div>

            </div>
          </div>

          {/* Answer review */}
          <div className="mt-10">
            <h2 className="mb-5 text-xl font-bold">
              Answer Review
            </h2>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const isCorrect =
                  answers[index] !== undefined &&
                  answers[index] === getCorrectAnswer(question);

                return (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold leading-6">
                        {index + 1}. {question.question}
                      </h3>

                      <span
                        className={`shrink-0 text-xs font-semibold ${
                          isCorrect ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-400">
                      Your answer: {answers[index] || "Not answered"}
                    </p>

                    <p className="mt-2 text-sm text-green-400">
                      Correct answer: {getCorrectAnswer(question) ?? "Unavailable"}
                    </p>

                    {question.explanation && (
                      <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-7 text-gray-400">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ACTIVE QUIZ
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-[80vh] px-5 py-14 text-white sm:px-8">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between gap-4">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              LearnFlow Quiz
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Test Your Knowledge
            </h1>
          </div>

          <Link
            to={`/materials/${videoId}`}
            className="text-sm text-gray-400 transition hover:text-white"
          >
            Exit Quiz ✕
          </Link>

        </div>

        {/* Progress */}
        <div className="mb-9">

          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span className="font-semibold text-violet-400">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>

        {/* Question Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-9">

          <div className="mb-7 flex items-center justify-between">
            <span className="rounded-lg bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-400">
              QUESTION {currentQuestion + 1}
            </span>

            <span className="text-xs text-gray-500">
              {Object.keys(answers).length} answered
            </span>
          </div>

          <h2 className="text-xl font-semibold leading-8 sm:text-2xl">
            {question.question}
          </h2>

          {/* Options */}
          <div className="mt-9 space-y-4">

            {question.options.map((option, index) => {
              const isSelected = answers[currentQuestion] === option;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-white/10 bg-white/[0.02] hover:border-violet-500/40 hover:bg-white/[0.05]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                      isSelected
                        ? "bg-violet-500 text-white"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span
                    className={`text-sm leading-6 ${
                      isSelected ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {option}
                  </span>

                  {isSelected && (
                    <span className="ml-auto text-violet-400">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}

          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between gap-3 border-t border-white/10 pt-7">

            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion((prev) => prev + 1)}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold transition hover:scale-105"
              >
                Next Question →
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-semibold transition hover:scale-105"
              >
                Submit Quiz ✓
              </button>
            )}

          </div>

        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Your progress is temporary and will not be saved.
        </p>

      </div>
    </div>
  );
}

export default Quiz;