import "./App.css";
import { useState, useEffect } from "react";
import { questions } from "../data/philQuizQuestions.tsx";
import type { CategoryKey, QuestionType } from "../types/quiz";
import { categories } from "../data/philQuizCategories.tsx";
import CategoryCard from "../components/categoryCard.tsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null,
  );

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 🎯 LOAD QUESTION
  const loadQuestion = (key: CategoryKey) => {
    const list = questions[key];
    const random = list[Math.floor(Math.random() * list.length)];

    setSelectedCategory(key);
    setQuestion(random);
    setSelectedChoice("");
    setIsSubmitted(false);

    // clean URL after QR load
    window.history.replaceState({}, "", "/");
  };

  // 🖱️ CLICK CATEGORY
  const handleCategoryClick = (key: CategoryKey) => {
    loadQuestion(key);
  };

  // 📱 QR AUTO DETECT
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category") as CategoryKey | null;

    if (category && questions[category]) {
      loadQuestion(category);
    }
  }, []);

  // ✅ SUBMIT ANSWER
  const handleSubmit = () => {
    if (!question) return;

    setIsSubmitted(true);

    // auto return to homepage after delay
    setTimeout(() => {
      setSelectedCategory(null);
      setQuestion(null);
      setSelectedChoice("");
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-purple-900 text-white p-6">
      {/* TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-wide">PhilQuiz</h1>
      </div>

      {/* CATEGORY SCREEN */}
      {!selectedCategory && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat.key as CategoryKey)}
              className="cursor-pointer"
            >
              <CategoryCard name={cat.name} icon={cat.icon} />
            </div>
          ))}
        </div>
      )}

      {/* QUESTION SCREEN */}
      {selectedCategory && question && (
        <div className="bg-white text-black p-6 rounded-xl w-[400px]">
          <h2 className="font-bold mb-4">{question.question}</h2>

          <div className="space-y-3">
            {question.choices.map((choice, i) => {
              const isCorrect = choice === question.answer;
              const isSelected = choice === selectedChoice;

              let bgColor = "bg-gray-200";

              if (isSubmitted) {
                if (isCorrect) {
                  bgColor = "bg-green-400"; // correct
                } else if (isSelected && !isCorrect) {
                  bgColor = "bg-red-400"; // wrong
                }
              } else if (isSelected) {
                bgColor = "bg-purple-300";
              }

              return (
                <button
                  key={i}
                  onClick={() => !isSubmitted && setSelectedChoice(choice)}
                  className={`w-full p-3 rounded ${bgColor}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={!selectedChoice || isSubmitted}
            className="mt-5 w-full bg-purple-600 text-white p-3 rounded disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
