"use client";

import React from "react";
import { HeroHighlight } from "../components/ui/hero-highlight";
import SurveyForm from "../components/survey";

const Survey = () => {
    return (
        <HeroHighlight containerClassName="h-screen w-full flex items-center justify-center">
            <div className="text-center space-y-4">    
                <SurveyForm/>
            </div>
        </HeroHighlight>
    );
  };
  
  export default Survey;