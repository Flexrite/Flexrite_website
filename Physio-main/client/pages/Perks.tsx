import React, { useState, useRef } from 'react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { User, UserCheck, Minus, Plus, Activity } from 'lucide-react';
import ShaderBackground from "@/components/ui/ShaderBackground";

interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  color: string;
}

interface CalorieResult {
  calories: number;
  goal: string;
  description: string;
}

export default function HealthCalculator() {
  const [bmiForm, setBmiForm] = useState({
    name: "",
    dateOfBirth: "",
    gender: "male",
    height: 172,
    weight: 50
  });
  const [bmiResult, setBmiResult] = useState(null);
  const [showBmiResult, setShowBmiResult] = useState(false);

  const [calorieForm, setCalorieForm] = useState({
    name: "",
    sex: "male",
    goal: "maintain",
    activityLevel: "moderate",
    height: 172,
    weight: 70
  });
  const [calorieResult, setCalorieResult] = useState(null);
  const [showCalorieResult, setShowCalorieResult] = useState(false);

  const bmiCardRef = useRef(null);
  const calorieCardRef = useRef(null);

  const calculateBMI = () => {
    if (!bmiForm.name || !bmiForm.dateOfBirth) return;

    const heightInMeters = bmiForm.height / 100;
    const bmi = bmiForm.weight / (heightInMeters * heightInMeters);
    
    let category = "";
    let description = "";
    let color = "";

    if (bmi < 18.5) {
      category = "Underweight";
      description = "Being underweight may indicate insufficient body fat and muscle mass. Focus on consuming a balanced diet to promote healthy weight gain.";
      color = "text-white-400";
    } else if (bmi < 25) {
      category = "Normal Weight";
      description = "A normal BMI indicates a healthy weight range associated with the lowest risk of health problems. Maintain your current lifestyle.";
      color = "text-white-400";
    } else if (bmi < 30) {
      category = "Overweight";
      description = "Being overweight may increase your risk of health conditions. Consider lifestyle changes including regular exercise and dietary modifications.";
      color = "text-white-400";
    } else {
      category = "Obese";
      description = "Obesity significantly increases health risks. It's recommended to consult with healthcare professionals for a comprehensive weight management plan.";
      color = "text-white-400";
    }

    const result = {
      bmi: Math.round(bmi * 10) / 10,
      category,
      description,
      color
    };

    setBmiResult(result);
    
    if (bmiCardRef.current) {
      bmiCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowBmiResult(true);
        if (bmiCardRef.current) {
          bmiCardRef.current.style.transform = 'rotateY(0deg)';
        }
      }, 300);
    }
  };

  const calculateCalories = () => {
    if (!calorieForm.name) return;

    const heightInCm = calorieForm.height;
    const weightInKg = calorieForm.weight;
    const age = 30;

    let bmr = 0;
    if (calorieForm.sex === "male") {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const maintenanceCalories = bmr * activityMultipliers[calorieForm.activityLevel];

    let calories = maintenanceCalories;
    let description = "";

    switch (calorieForm.goal) {
      case "lose":
        calories = maintenanceCalories - 500;
        description = "To lose weight safely, aim for a 500-calorie deficit per day for approximately 1 pound of weight loss per week.";
        break;
      case "gain":
        calories = maintenanceCalories + 500;
        description = "To gain weight healthily, aim for a 500-calorie surplus per day for approximately 1 pound of weight gain per week.";
        break;
      default:
        description = "These calories will help you maintain your current weight based on your activity level and metabolism.";
    }

    const result = {
      calories: Math.round(calories),
      goal: calorieForm.goal,
      description
    };

    setCalorieResult(result);
    
    if (calorieCardRef.current) {
      calorieCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowCalorieResult(true);
        if (calorieCardRef.current) {
          calorieCardRef.current.style.transform = 'rotateY(0deg)';
        }
      }, 300);
    }
  };

  const updateHeight = (value, type) => {
    const newValue = Math.max(100, Math.min(250, value));
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, height: newValue }));
    } else {
      setCalorieForm(prev => ({ ...prev, height: newValue }));
    }
  };

  const updateWeight = (value, type) => {
    const newValue = Math.max(30, Math.min(300, value));
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, weight: newValue }));
    } else {
      setCalorieForm(prev => ({ ...prev, weight: newValue }));
    }
  };

  const handleHeightInputChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, height: value }));
    } else {
      setCalorieForm(prev => ({ ...prev, height: value }));
    }
  };

  const handleWeightInputChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, weight: value }));
    } else {
      setCalorieForm(prev => ({ ...prev, weight: value }));
    }
  };

  const handleHeightInputBlur = (type) => {
    if (type === 'bmi') {
      updateHeight(bmiForm.height, 'bmi');
    } else {
      updateHeight(calorieForm.height, 'calorie');
    }
  };

  const handleWeightInputBlur = (type) => {
    if (type === 'bmi') {
      updateWeight(bmiForm.weight, 'bmi');
    } else {
      updateWeight(calorieForm.weight, 'calorie');
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const resetBMI = () => {
    if (bmiCardRef.current) {
      bmiCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowBmiResult(false);
        setBmiResult(null);
        if (bmiCardRef.current) {
          bmiCardRef.current.style.transform = 'rotateY(0deg)';
        }
      }, 300);
    }
  };

  const resetCalorie = () => {
    if (calorieCardRef.current) {
      calorieCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowCalorieResult(false);
        setCalorieResult(null);
        if (calorieCardRef.current) {
          calorieCardRef.current.style.transform = 'rotateY(0deg)';
        }
      }, 300);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <ShaderBackground>
        <div className="p-8 relative z-10 pt-24">
          <style jsx>{`
            .flip-card {
              perspective: 1000px;
              transition: transform 0.6s;
            }
            /* Hide number input arrows */
            input[type='number']::-webkit-outer-spin-button,
            input[type='number']::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type='number'] {
              -moz-appearance: textfield;
            }
          `}</style>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                Health Calculator
              </h1>
              <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                Calculate your Body Mass Index and daily calorie requirements with precision
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div ref={bmiCardRef} className="flip-card h-full">
                {!showBmiResult ? (
                  <div className="rounded-2xl p-6 shadow-2xl h-full" 
                       style={{ 
                         background: 'rgba(255, 255, 255, 0.1)',
                         backdropFilter: 'blur(10px)',
                         border: '1px solid rgba(255, 255, 255, 0.2)',
                       }}>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-3">BMI Calculator</h2>
                      <div className="w-16 h-0.5 bg-white/60"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white font-medium">Your Name</Label>
                          <Input
                            placeholder="Enter your name"
                            value={bmiForm.name}
                            onChange={(e) => setBmiForm(prev => ({ ...prev, name: e.target.value }))}
                            className="rounded-lg border-white/30 bg-white/20 text-white placeholder:text-gray-300 h-10 focus:border-white focus:ring-white/20"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white font-medium">Date of Birth</Label>
                          <Input
                            type="date"
                            value={bmiForm.dateOfBirth}
                            onChange={(e) => setBmiForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            className="rounded-lg border-white/30 bg-white/20 text-white h-10 focus:border-white focus:ring-white/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white font-medium">Gender</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant={bmiForm.gender === "male" ? "default" : "outline"}
                            onClick={() => setBmiForm(prev => ({ ...prev, gender: "male" }))}
                            className={`flex items-center gap-2 h-10 rounded-lg transition-all ${
                              bmiForm.gender === "male" 
                                ? 'bg-white text-gray-900 hover:bg-white/90' 
                                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                            }`}
                          >
                            <User className="w-4 h-4" />
                            Male
                          </Button>
                          <Button
                            type="button"
                            variant={bmiForm.gender === "female" ? "default" : "outline"}
                            onClick={() => setBmiForm(prev => ({ ...prev, gender: "female" }))}
                            className={`flex items-center gap-2 h-10 rounded-lg transition-all ${
                              bmiForm.gender === "female" 
                                ? 'bg-white text-gray-900 hover:bg-white/90' 
                                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                            }`}
                          >
                            <UserCheck className="w-4 h-4" />
                            Female
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white font-medium">Height (cm)</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => updateHeight(bmiForm.height - 1, 'bmi')}
                              className="rounded-full w-8 h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={bmiForm.height}
                              onChange={(e) => handleHeightInputChange(e, 'bmi')}
                              onBlur={() => handleHeightInputBlur('bmi')}
                              className="flex-1 text-center py-2 px-3 bg-white/20 border border-white/30 rounded-lg font-bold text-xl text-white h-10 no-spinner"
                              min="100"
                              max="250"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => updateHeight(bmiForm.height + 1, 'bmi')}
                              className="rounded-full w-8 h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white font-medium">Weight (kg)</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => updateWeight(bmiForm.weight - 1, 'bmi')}
                              className="rounded-full w-8 h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={bmiForm.weight}
                              onChange={(e) => handleWeightInputChange(e, 'bmi')}
                              onBlur={() => handleWeightInputBlur('bmi')}
                              className="flex-1 text-center py-2 px-3 bg-white/20 border border-white/30 rounded-lg font-bold text-xl text-white h-10 no-spinner"
                              min="30"
                              max="300"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => updateWeight(bmiForm.weight + 1, 'bmi')}
                              className="rounded-full w-8 h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={calculateBMI}
                        className="w-full rounded-lg py-3 font-bold h-11 bg-white text-gray-900 hover:bg-white/90 transition-all"
                      >
                        Calculate BMI
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl p-6 shadow-2xl h-full" 
                       style={{ 
                         background: 'rgba(255, 255, 255, 0.1)',
                         backdropFilter: 'blur(10px)',
                         border: '1px solid rgba(255, 255, 255, 0.2)',
                       }}>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-3">BMI Result</h2>
                      <div className="w-16 h-0.5 bg-white/60"></div>
                    </div>

                    {bmiResult && (
                      <div className="space-y-4">
                        <Card className="bg-white/20 border-white/30">
                          <CardContent className="p-4">
                            <div className="text-center mb-4">
                              <h3 className="text-xl font-bold text-white mb-1">{bmiForm.name}</h3>
                              <div className="text-4xl font-black text-white mb-1">{bmiResult.bmi}</div>
                              <div className="text-white/80 text-sm">BMI Score</div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 text-center">
                              <div>
                                <div className="font-bold text-lg text-white">{calculateAge(bmiForm.dateOfBirth)} yrs</div>
                                <div className="text-white/80 text-xs">Age</div>
                              </div>
                              <div>
                                <div className="font-bold text-lg text-white">{bmiForm.height} cm</div>
                                <div className="text-white/80 text-xs">Height</div>
                              </div>
                              <div>
                                <div className="font-bold text-lg text-white">{bmiForm.weight} kg</div>
                                <div className="text-white/80 text-xs">Weight</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/20 border-white/30">
                          <CardContent className="p-4">
                            <h4 className={`text-xl font-bold mb-2 ${bmiResult.color}`}>{bmiResult.category}</h4>
                            <p className="text-white/80 text-sm leading-relaxed">{bmiResult.description}</p>
                          </CardContent>
                        </Card>

                        <Button 
                          onClick={resetBMI}
                          className="w-full rounded-lg py-3 font-bold h-11 bg-white text-gray-900 hover:bg-white/90 transition-all"
                        >
                          Calculate Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div ref={calorieCardRef} className="flip-card h-full">
                {!showCalorieResult ? (
                  <div className="rounded-2xl p-6 shadow-2xl h-full" 
                       style={{ 
                         background: 'rgba(255, 255, 255, 0.1)',
                         backdropFilter: 'blur(10px)',
                         border: '1px solid rgba(255, 255, 255, 0.2)',
                       }}>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-3">Calorie Calculator</h2>
                      <div className="w-16 h-0.5 bg-white/60"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-white font-medium">Your Name</Label>
                        <Input
                          placeholder="Enter your name"
                          value={calorieForm.name}
                          onChange={(e) => setCalorieForm(prev => ({ ...prev, name: e.target.value }))}
                          className="rounded-lg border-white/30 bg-white/20 text-white placeholder:text-gray-300 h-10 focus:border-white focus:ring-white/20"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white font-medium">Sex</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              type="button"
                              variant={calorieForm.sex === "male" ? "default" : "outline"}
                              onClick={() => setCalorieForm(prev => ({ ...prev, sex: "male" }))}
                              className={`flex items-center gap-1 h-10 rounded-lg transition-all text-sm ${
                                calorieForm.sex === "male" 
                                  ? 'bg-white text-gray-900 hover:bg-white/90' 
                                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                              }`}
                            >
                              <User className="w-3 h-3" />
                              Male
                            </Button>
                            <Button
                              type="button"
                              variant={calorieForm.sex === "female" ? "default" : "outline"}
                              onClick={() => setCalorieForm(prev => ({ ...prev, sex: "female" }))}
                              className={`flex items-center gap-1 h-10 rounded-lg transition-all text-sm ${
                                calorieForm.sex === "female" 
                                  ? 'bg-white text-gray-900 hover:bg-white/90' 
                                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                              }`}
                            >
                              <UserCheck className="w-3 h-3" />
                              Female
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white font-medium">Goal</Label>
                          <Select value={calorieForm.goal} onValueChange={(value) => setCalorieForm(prev => ({ ...prev, goal: value }))}>
                            <SelectTrigger className="rounded-lg border-white/30 bg-white/20 text-white h-10 focus:border-white focus:ring-white/20 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="lose" className="text-white focus:bg-gray-700 text-sm">Lose Weight</SelectItem>
                              <SelectItem value="maintain" className="text-white focus:bg-gray-700 text-sm">Maintain Weight</SelectItem>
                              <SelectItem value="gain" className="text-white focus:bg-gray-700 text-sm">Gain Weight</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white font-medium">Activity Level</Label>
                        <Select value={calorieForm.activityLevel} onValueChange={(value) => setCalorieForm(prev => ({ ...prev, activityLevel: value }))}>
                          <SelectTrigger className="rounded-lg border-white/30 bg-white/20 text-white h-10 focus:border-white focus:ring-white/20 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="sedentary" className="text-white focus:bg-gray-700 text-sm">Sedentary</SelectItem>
                            <SelectItem value="light" className="text-white focus:bg-gray-700 text-sm">Light Activity</SelectItem>
                            <SelectItem value="moderate" className="text-white focus:bg-gray-700 text-sm">Moderate Activity</SelectItem>
                            <SelectItem value="active" className="text-white focus:bg-gray-700 text-sm">Active</SelectItem>
                            <SelectItem value="very_active" className="text-white focus:bg-gray-700 text-sm">Very Active</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white font-medium">Height (cm)</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => updateHeight(calorieForm.height - 1, 'calorie')}
                              className="rounded-full w-8 h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={calorieForm.height}
                              onChange={(e) => handleHeightInputChange(e, 'calorie')}
                              onBlur={() => handleHeightInputBlur('calorie')}
                              className="flex-1 text-center py-2 px-3 bg-white/20 border border-white/30 rounded-lg font-bold text-xl text-white h-10 no-spinner"
                              min="100"
                              max="250"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => updateHeight(calorieForm.height + 1, 'calorie')}
                              className="rounded-full w-8 h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white font-medium">Weight (kg)</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => updateWeight(calorieForm.weight - 1, 'calorie')}
                              className="rounded-full w-8 h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={calorieForm.weight}
                              onChange={(e) => handleWeightInputChange(e, 'calorie')}
                              onBlur={() => handleWeightInputBlur('calorie')}
                              className="flex-1 text-center py-2 px-3 bg-white/20 border border-white/30 rounded-lg font-bold text-xl text-white h-10 no-spinner"
                              min="30"
                              max="300"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => updateWeight(calorieForm.weight + 1, 'calorie')}
                              className="rounded-full w-8 h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={calculateCalories}
                        className="w-full rounded-lg py-3 font-bold h-11 bg-white text-gray-900 hover:bg-white/90 transition-all"
                      >
                        Calculate Calories
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl p-6 shadow-2xl h-full" 
                       style={{ 
                         background: 'rgba(255, 255, 255, 0.1)',
                         backdropFilter: 'blur(10px)',
                         border: '1px solid rgba(255, 255, 255, 0.2)',
                       }}>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-3">Calorie Result</h2>
                      <div className="w-16 h-0.5 bg-white/60"></div>
                    </div>

                    {calorieResult && (
                      <div className="space-y-4">
                        <Card className="bg-white/20 border-white/30">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-1">{calorieForm.name}</h3>
                                <p className="text-white/80 text-sm mb-4">Daily Calorie Needs</p>
                                
                                <div className="mb-4">
                                  <div className="text-4xl font-black text-white mb-1">{calorieResult.calories}</div>
                                  <div className="text-white/80 text-sm">Calories/Day</div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-center">
                                  <div>
                                    <div className="font-bold text-lg text-white">{calorieForm.height} cm</div>
                                    <div className="text-white/80 text-xs">Height</div>
                                  </div>
                                  <div>
                                    <div className="font-bold text-lg text-white">{calorieForm.weight} kg</div>
                                    <div className="text-white/80 text-xs">Weight</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="ml-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                  <Activity className="w-6 h-6 text-white" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-white/20 border-white/30">
                          <CardContent className="p-4">
                            <h4 className="text-xl font-bold text-white mb-2">
                              {calorieForm.goal.charAt(0).toUpperCase() + calorieForm.goal.slice(1)} Weight Goal
                            </h4>
                            <p className="text-md font-medium text-white/60 mb-2">
                              {calorieForm.activityLevel.replace('_', ' ')} activity level
                            </p>
                            <p className="text-white/80 text-sm leading-relaxed">
                              {calorieResult.description}
                            </p>
                          </CardContent>
                        </Card>

                        <Button 
                          onClick={resetCalorie}
                          className="w-full rounded-lg py-3 font-bold h-11 bg-white text-gray-900 hover:bg-white/90 transition-all"
                        >
                          Calculate Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ShaderBackground>
    </div>
  );
}