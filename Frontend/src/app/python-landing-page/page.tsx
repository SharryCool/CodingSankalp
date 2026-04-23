import AIJobOpportunitySection from "@/components/PythonPage/AIJobOpportunitySection";
import AIReplacementFearSection from "@/components/PythonPage/AIReplacementFearSection";
import BonusesSection from "@/components/PythonPage/BonusesSection";
import CertificateImpactSection from "@/components/PythonPage/CertificateImpactSection";
import CohortCoveredSection from "@/components/PythonPage/CohortCoveredSection";
import FAQSection from "@/components/PythonPage/FAQSection";
import LearnInCohortSection from "@/components/PythonPage/LearnInCohortSection";
import MeetYourMentorsSection from "@/components/PythonPage/MeetYourMentorsSection";
import ProgramForSection from "@/components/PythonPage/ProgramForSection";
import PythonOpeningsSection from "@/components/PythonPage/PythonOpeningsSection";
import PythonProOfferSection from "@/components/PythonPage/PythonProOfferSection";
import SalaryHikeSection from "@/components/PythonPage/SalaryHikeSection";
import StudentAchievementSection from "@/components/PythonPage/StudentAchievementSection";

export default function Page() {
    return (
       <>
       <PythonProOfferSection/>
       <CohortCoveredSection/>
       <CertificateImpactSection/>
       <StudentAchievementSection/>
       <AIReplacementFearSection/>
       <LearnInCohortSection/>
       <AIJobOpportunitySection/>
       <PythonOpeningsSection/>
       <ProgramForSection/>
       <SalaryHikeSection/>
       <BonusesSection/>
       <MeetYourMentorsSection/>
       <FAQSection/>
       </>
    );
}