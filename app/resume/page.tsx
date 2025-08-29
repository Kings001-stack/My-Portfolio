import AdvancedResume from "./AdvancedResume";

export const metadata = {
  title: "Resume | Emmanuel King Ugwu",
  description:
    "Resume of Emmanuel King Ugwu – Software Designer & Full Stack Developer. Experience, skills, education, and contact details.",
};

export default function ResumePage() {
  return <AdvancedResume pdfPath="/my CV.pdf" />;
}
