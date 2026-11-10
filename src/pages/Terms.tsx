import { LegalPage, Section } from "../components/LegalPage";
import { useLang } from "../i18n/context";
import { LEGAL } from "../i18n/legal";

export function Terms() {
    const { t, lang } = useLang();
    const legal = (LEGAL[lang] ?? LEGAL.en).terms;

    return (
        <LegalPage title={legal.title} updated={`${t("last_updated")}: [add date]`}>
            {legal.sections.map(([title, body]) => (
                <Section key={title} title={title}>
                    <p style={{ margin: 0 }}>{body}</p>
                </Section>
            ))}
        </LegalPage>
    );
}