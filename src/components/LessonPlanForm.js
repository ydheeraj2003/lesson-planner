import { useState } from "react";
import axios from "axios";
import Input from "./ui/input";
import Textarea from "./ui/textarea";
import Button from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Skeleton from "./ui/skeleton";
import { jsPDF } from "jspdf";

const LessonPlanForm = () => {
  const [lessonData, setLessonData] = useState({
    topic: "",
    gradeLevel: "",
    mainConcept: "",
    subtopics: "",
    materials: "",
    objectives: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedData, setGeneratedData] = useState(null);
  const [editableContent, setEditableContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setLessonData({ ...lessonData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditableContent(e.target.value);
  };

  const handleSaveChanges = () => {
    setGeneratedData(editableContent);
    setIsEditing(false);
  };

  const fetchLessonPlan = async () => {
    setLoading(true);
    setError("");
    setGeneratedData(null);
    setEditableContent("");

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) throw new Error("Missing API key");

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Generate a structured lesson plan with these details:
                  - Topic: ${lessonData.topic}
                  - Grade Level: ${lessonData.gradeLevel}
                  - Main Concept: ${lessonData.mainConcept}
                  - Subtopics: ${lessonData.subtopics}
                  - Materials Needed: ${lessonData.materials}
                  - Learning Objectives: ${lessonData.objectives}

                  **Provide structured output in this format:**
                  Lesson Content:
                  - **Introduction**
                    [Provide introduction]
                  - **Key Concepts**
                    [Explain main concepts]
                  - **Examples**
                    [Give real-world examples]
                  - **Conclusion**
                    [Summarize lesson]
                  Classroom Activities:
                  - **Activity 1: [Activity Name]**
                    [Describe activity]
                  - **Activity 2: [Activity Name]**
                    [Describe activity]
                  Assessment Questions:
                  - [Question 1]
                  - [Question 2]
                  - [Question 3]`,
                },
              ],
            },
          ],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text
      ) {
        const rawText = response.data.candidates[0].content.parts[0].text.replace(/\*/g, "");
        setGeneratedData(rawText);
        setEditableContent(rawText);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch lesson plan. Please check API key and request format.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFont("helvetica");
    pdf.setFontSize(12);
    pdf.text(generatedData, 10, 10, { maxWidth: 180 });
    pdf.save("lesson_plan.pdf");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Create Lesson Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input type="text" name="topic" placeholder="Lesson Topic" value={lessonData.topic} onChange={handleChange} />
            <Input type="text" name="gradeLevel" placeholder="Grade Level" value={lessonData.gradeLevel} onChange={handleChange} />
            <Input type="text" name="mainConcept" placeholder="Main Concept" value={lessonData.mainConcept} onChange={handleChange} />
            <Textarea name="subtopics" placeholder="Subtopics" value={lessonData.subtopics} onChange={handleChange} />
            <Textarea name="materials" placeholder="Materials Needed" value={lessonData.materials} onChange={handleChange} />
            <Textarea name="objectives" placeholder="Learning Objectives" value={lessonData.objectives} onChange={handleChange} />
            <Button type="button" onClick={fetchLessonPlan} className="w-full">Generate Lesson Plan</Button>
            {loading && <Skeleton className="w-full h-20 mt-4" />}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {generatedData && (
              <Card className="mt-6 p-6 bg-white shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">Generated Lesson Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <Textarea value={editableContent} onChange={handleEditChange} />
                  ) : (
                    <pre className="whitespace-pre-wrap text-gray-800">{generatedData}</pre>
                  )}
                  <Button type="button" onClick={() => (isEditing ? handleSaveChanges() : setIsEditing(true))} className="w-full bg-blue-500">
                    {isEditing ? "Save Changes" : "Edit Lesson Plan"}
                  </Button>
                  <Button type="button" onClick={downloadPDF} className="w-full bg-green-500 mt-2">Download as PDF</Button>
                </CardContent>
              </Card>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonPlanForm;
