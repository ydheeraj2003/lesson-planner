import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Button from "./ui/button";
import { jsPDF } from "jspdf";

const LessonPlanDisplay = ({ generatedData }) => {
  const [editableData, setEditableData] = useState(generatedData);

  // Handle manual edits in the lesson plan
  const handleEdit = (section, value) => {
    setEditableData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  // Function to download the lesson plan as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Generated Lesson Plan", 20, 20);

    const sections = ["Lesson Content", "Classroom Activities", "Assessment Questions"];

    let y = 30;
    sections.forEach((section) => {
      if (editableData[section.toLowerCase().replace(" ", "")]) {
        doc.setFontSize(14);
        doc.text(section, 20, y);
        doc.setFontSize(12);
        y += 10;

        const text = editableData[section.toLowerCase().replace(" ", "")].replace(/\*/g, "");
        const splitText = doc.splitTextToSize(text, 180);
        doc.text(splitText, 20, y);
        y += splitText.length * 7;
      }
    });

    doc.save("Lesson_Plan.pdf");
  };

  return (
    <Card className="mt-6 p-6 bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Editable Lesson Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {["lessonContent", "classroomActivities", "assessmentQuestions"].map((section, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {section === "lessonContent"
                ? "Lesson Content"
                : section === "classroomActivities"
                ? "Classroom Activities"
                : "Assessment Questions"}
            </h2>
            <textarea
              className="w-full h-40 border rounded-md p-2 text-gray-800 bg-gray-100"
              value={editableData[section]}
              onChange={(e) => handleEdit(section, e.target.value)}
            />
          </div>
        ))}
        <div className="flex gap-4">
          <Button className="bg-blue-600 text-white" onClick={downloadPDF}>
            Download as PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonPlanDisplay;
