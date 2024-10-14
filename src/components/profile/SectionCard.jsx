/* eslint-disable react/prop-types */
const SectionCard = ({ title, content }) => (
    <section className="p-8 rounded-lg bg-card">
        <h2 className="text-2xl font-semibold transition duration-300 text-textPrimary hover:text-secondary">
            {title}
        </h2>
        <div className="mt-4 text-base">{content}</div>
    </section>
);

export default SectionCard