import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, Gift, MapPin, Heart, Zap, Target, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameScore {
  points: number;
  level: number;
  streak: number;
  totalGames: number;
  bestScore: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  type: "discount" | "guide" | "consultation" | "premium";
  icon: string;
  claimed: boolean;
}

interface MalaysiaFact {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: "culture" | "geography" | "food" | "language" | "business";
}

const malaysiaFacts: MalaysiaFact[] = [
  {
    id: "1",
    question: "What is the capital city of Malaysia?",
    options: ["Kuala Lumpur", "Penang", "Johor Bahru", "Kota Kinabalu"],
    correct: 0,
    explanation: "Kuala Lumpur is Malaysia's capital and largest city, known for the iconic Petronas Twin Towers.",
    category: "geography"
  },
  {
    id: "2",
    question: "Which language is widely spoken in Malaysian business?",
    options: ["Only Malay", "Only English", "English and Malay", "Only Chinese"],
    correct: 2,
    explanation: "Both English and Malay are widely used in Malaysian business, making it accessible for international professionals.",
    category: "language"
  },
  {
    id: "3",
    question: "What is Malaysia's most famous traditional dish?",
    options: ["Nasi Lemak", "Sushi", "Pasta", "Burger"],
    correct: 0,
    explanation: "Nasi Lemak is Malaysia's national dish, featuring coconut rice with various accompaniments.",
    category: "food"
  },
  {
    id: "4",
    question: "What currency is used in Malaysia?",
    options: ["Malaysian Dollar", "Malaysian Ringgit", "Malaysian Peso", "Malaysian Baht"],
    correct: 1,
    explanation: "The Malaysian Ringgit (MYR) is the official currency of Malaysia.",
    category: "business"
  },
  {
    id: "5",
    question: "Malaysia is located in which region?",
    options: ["Southeast Asia", "East Asia", "South Asia", "Central Asia"],
    correct: 0,
    explanation: "Malaysia is strategically located in Southeast Asia, making it a gateway to the region.",
    category: "geography"
  },
  {
    id: "6",
    question: "What is the traditional greeting in Malaysia?",
    options: ["Handshake only", "Bow", "Salam (light handshake)", "High five"],
    correct: 2,
    explanation: "The traditional Malaysian greeting is 'Salam' - a light handshake, often used in business settings.",
    category: "culture"
  },
  {
    id: "7",
    question: "Which city is known as Malaysia's tech hub?",
    options: ["Penang", "Cyberjaya", "Kuala Lumpur", "All of the above"],
    correct: 3,
    explanation: "Malaysia has multiple tech hubs including Cyberjaya (planned tech city), KL, and Penang's Silicon Valley.",
    category: "business"
  },
  {
    id: "8",
    question: "What is the most common work visa for professionals in Malaysia?",
    options: ["Tourist Visa", "Employment Pass", "Student Visa", "Transit Visa"],
    correct: 1,
    explanation: "The Employment Pass is the primary work visa for skilled foreign professionals in Malaysia.",
    category: "business"
  }
];

const availableRewards: Reward[] = [
  {
    id: "discount_5",
    title: "5% PDF Guide Discount",
    description: "Get 5% off your Malaysia Relocation PDF Guide purchase",
    pointsCost: 100,
    type: "discount",
    icon: "📄",
    claimed: false
  },
  {
    id: "discount_10",
    title: "10% PDF Guide Discount",
    description: "Get 10% off your Malaysia Relocation PDF Guide purchase",
    pointsCost: 250,
    type: "discount",
    icon: "📋",
    claimed: false
  },
  {
    id: "bonus_fact",
    title: "Bonus Malaysia Facts",
    description: "Unlock 5 exclusive Malaysia business culture insights",
    pointsCost: 150,
    type: "guide",
    icon: "🇲🇾",
    claimed: false
  },
  {
    id: "consultation_discount",
    title: "Free 15-min Consultation",
    description: "Get a free 15-minute relocation consultation call",
    pointsCost: 500,
    type: "consultation",
    icon: "☎️",
    claimed: false
  },
  {
    id: "premium_trial",
    title: "Premium Features Trial",
    description: "7-day access to premium assessment features",
    pointsCost: 300,
    type: "premium",
    icon: "⭐",
    claimed: false
  }
];

export default function StressReliefGame() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<MalaysiaFact | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameScore, setGameScore] = useState<GameScore>({
    points: 0,
    level: 1,
    streak: 0,
    totalGames: 0,
    bestScore: 0
  });
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameMode, setGameMode] = useState<"quiz" | "breathing" | "mindfulness">("quiz");
  const [showRewards, setShowRewards] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>(availableRewards);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathingCycle, setBreathingCycle] = useState(0);
  const { toast } = useToast();

  // Load saved game state
  useEffect(() => {
    const savedScore = localStorage.getItem("smartrelocate_game_score");
    const savedRewards = localStorage.getItem("smartrelocate_game_rewards");
    
    if (savedScore) {
      setGameScore(JSON.parse(savedScore));
    }
    if (savedRewards) {
      setRewards(JSON.parse(savedRewards));
    }
  }, []);

  // Save game state
  const saveGameState = useCallback(() => {
    localStorage.setItem("smartrelocate_game_score", JSON.stringify(gameScore));
    localStorage.setItem("smartrelocate_game_rewards", JSON.stringify(rewards));
  }, [gameScore, rewards]);

  useEffect(() => {
    saveGameState();
  }, [saveGameState]);

  // Timer for quiz questions
  useEffect(() => {
    if (isGameActive && gameMode === "quiz" && timeLeft > 0 && !showAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showAnswer) {
      handleAnswerSubmit();
    }
  }, [timeLeft, isGameActive, showAnswer, gameMode]);

  // Breathing exercise timer
  useEffect(() => {
    if (gameMode === "breathing" && isGameActive) {
      const phases = { inhale: 4000, hold: 4000, exhale: 4000 };
      const timer = setTimeout(() => {
        if (breathingPhase === "inhale") setBreathingPhase("hold");
        else if (breathingPhase === "hold") setBreathingPhase("exhale");
        else {
          setBreathingPhase("inhale");
          setBreathingCycle(prev => prev + 1);
        }
      }, phases[breathingPhase]);
      
      return () => clearTimeout(timer);
    }
  }, [breathingPhase, gameMode, isGameActive]);

  const startGame = (mode: "quiz" | "breathing" | "mindfulness") => {
    setGameMode(mode);
    setIsGameActive(true);
    
    if (mode === "quiz") {
      startNewQuestion();
    } else if (mode === "breathing") {
      setBreathingPhase("inhale");
      setBreathingCycle(0);
    }
  };

  const startNewQuestion = () => {
    const randomQuestion = malaysiaFacts[Math.floor(Math.random() * malaysiaFacts.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(15);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showAnswer) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    setShowAnswer(true);
    
    const isCorrect = selectedAnswer === currentQuestion?.correct;
    const timeBonus = Math.max(0, timeLeft * 2);
    const points = isCorrect ? (50 + timeBonus) : 10;
    
    setGameScore(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 500) + 1;
      const newBestScore = Math.max(prev.bestScore, newPoints);
      
      return {
        points: newPoints,
        level: newLevel,
        streak: newStreak,
        totalGames: prev.totalGames + 1,
        bestScore: newBestScore
      };
    });

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: `+${points} points! ${timeLeft > 10 ? "Speed bonus!" : ""}`,
      });
    } else {
      toast({
        title: "Not quite right",
        description: "+10 points for trying! Keep learning about Malaysia.",
        variant: "destructive",
      });
    }

    setTimeout(() => {
      startNewQuestion();
    }, 3000);
  };

  const endGame = () => {
    setIsGameActive(false);
    setCurrentQuestion(null);
    
    if (gameMode === "breathing" && breathingCycle >= 5) {
      const points = breathingCycle * 20;
      setGameScore(prev => ({ 
        ...prev, 
        points: prev.points + points,
        totalGames: prev.totalGames + 1
      }));
      
      toast({
        title: "Breathing Complete! 🧘‍♀️",
        description: `+${points} points for stress relief! You completed ${breathingCycle} cycles.`,
      });
    }
  };

  const claimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || reward.claimed || gameScore.points < reward.pointsCost) {
      return;
    }

    setGameScore(prev => ({ ...prev, points: prev.points - reward.pointsCost }));
    setRewards(prev => prev.map(r => 
      r.id === rewardId ? { ...r, claimed: true } : r
    ));

    toast({
      title: "Reward Claimed! 🎁",
      description: `You've successfully claimed: ${reward.title}`,
    });
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case "inhale": return "Breathe In...";
      case "hold": return "Hold...";
      case "exhale": return "Breathe Out...";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Stress Relief & Learning Hub</h2>
        <p className="text-lg text-gray-600">Relax, learn about Malaysia, and earn rewards for your relocation journey</p>
      </div>

      {/* Game Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{gameScore.points}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{gameScore.level}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{gameScore.streak}</div>
              <div className="text-sm text-gray-600">Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{gameScore.totalGames}</div>
              <div className="text-sm text-gray-600">Games</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Level {gameScore.level + 1}</span>
              <span>{gameScore.points % 500}/500</span>
            </div>
            <Progress value={(gameScore.points % 500) / 5} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Game Selection */}
      {!isGameActive && (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => startGame("quiz")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Malaysia Quiz
              </CardTitle>
              <CardDescription>
                Test your knowledge about Malaysia while earning points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Quiz Game</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => startGame("breathing")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-600" />
                Breathing Exercise
              </CardTitle>
              <CardDescription>
                Reduce stress with guided breathing exercises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Start Breathing</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowRewards(true)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-600" />
                Rewards Store
              </CardTitle>
              <CardDescription>
                Redeem your points for valuable relocation benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">View Rewards</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quiz Game */}
      {isGameActive && gameMode === "quiz" && currentQuestion && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Malaysia Knowledge Quiz</CardTitle>
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  <Clock className="w-4 h-4 mr-1" />
                  {timeLeft}s
                </Badge>
                <Button variant="outline" onClick={endGame}>End Game</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
                <Progress value={((15 - timeLeft) / 15) * 100} className="w-full mb-4" />
              </div>
              
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 text-left rounded-lg border transition-colors ${
                      selectedAnswer === index
                        ? showAnswer
                          ? index === currentQuestion.correct
                            ? "bg-green-100 border-green-500 text-green-800"
                            : "bg-red-100 border-red-500 text-red-800"
                          : "bg-blue-100 border-blue-500 text-blue-800"
                        : showAnswer && index === currentQuestion.correct
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showAnswer}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {selectedAnswer !== null && !showAnswer && (
                <Button onClick={handleAnswerSubmit} className="w-full">
                  Submit Answer
                </Button>
              )}

              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-50 rounded-lg"
                >
                  <p className="font-semibold text-blue-900 mb-2">Did you know?</p>
                  <p className="text-blue-800">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breathing Exercise */}
      {isGameActive && gameMode === "breathing" && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Guided Breathing Exercise</CardTitle>
              <div className="flex items-center gap-4">
                <Badge variant="outline">Cycle {breathingCycle}</Badge>
                <Button variant="outline" onClick={endGame}>Finish</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-8">
              <div className="text-3xl font-bold text-gray-900">
                {getBreathingInstruction()}
              </div>
              
              <motion.div
                className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-600"
                animate={{
                  scale: breathingPhase === "inhale" ? 1.3 : breathingPhase === "hold" ? 1.3 : 1,
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
              
              <div className="text-lg text-gray-600">
                {breathingPhase === "inhale" && "Slowly breathe in through your nose..."}
                {breathingPhase === "hold" && "Hold your breath gently..."}
                {breathingPhase === "exhale" && "Slowly exhale through your mouth..."}
              </div>
              
              {breathingCycle >= 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-green-50 rounded-lg"
                >
                  <p className="text-green-800">Great job! You've completed 5 cycles. Feel free to continue or finish when ready.</p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rewards Dialog */}
      <Dialog open={showRewards} onOpenChange={setShowRewards}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rewards Store</DialogTitle>
            <DialogDescription>
              Redeem your points for valuable relocation benefits
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Star className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Available Points: {gameScore.points}</span>
            </div>
            
            <div className="grid gap-4">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className={`p-4 border rounded-lg ${
                    reward.claimed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{reward.icon}</span>
                      <div>
                        <h4 className="font-semibold">{reward.title}</h4>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                        <Badge variant="outline" className="mt-1">
                          {reward.pointsCost} points
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      variant={reward.claimed ? "secondary" : "default"}
                      disabled={reward.claimed || gameScore.points < reward.pointsCost}
                      onClick={() => claimReward(reward.id)}
                    >
                      {reward.claimed ? "Claimed" : "Claim"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}