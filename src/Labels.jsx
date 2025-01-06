import { Html } from "@react-three/drei";

const Labels = ({ label }) => {
  return (
    <Html>
      <div className="label-box">
        <span className="smll-txt">{label}</span>
      </div>
    </Html>
  );
};

export default Labels;
