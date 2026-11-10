import type { Lang } from "./translation";

export type Legal = { title: string; sections: [string, string][] };
export type LegalSet = { terms: Legal; privacy: Legal };

const en: LegalSet = {
    terms: {
        title: "Terms of Service",
        sections: [
            ["1. Acceptance of terms", "By creating an account or using BitKastl, you agree to these Terms of Service. If you do not agree, please do not use the platform."],
            ["2. Eligibility", "You must be at least 18 years old and legally able to enter into this agreement in your country. You are responsible for making sure that using BitKastl is allowed where you live."],
            ["3. Your account", "You are responsible for keeping your login details secure and for all activity on your account. Tell us immediately if you suspect unauthorised access."],
            ["4. Investments and risk", "All investments carry risk, including the possible loss of capital. Past performance does not guarantee future results, and nothing on this site is financial advice. Only invest money you can afford to lose."],
            ["5. Deposits and withdrawals", "[Describe accepted payment methods, processing times, fees, and withdrawal conditions.]"],
            ["6. Prohibited use", "You may not use BitKastl for money laundering, fraud, or any unlawful activity, or attempt to disrupt or gain unauthorised access to the platform."],
            ["7. Changes to these terms", "We may update these terms from time to time. Continued use of BitKastl after an update means you accept the new terms."],
            ["8. Contact", "Questions about these terms? Email us at support@bitkastl.com."],
        ],
    },
    privacy: {
        title: "Privacy Policy",
        sections: [
            ["1. Information we collect", "We collect the details you give us when you register (such as your name and email), your transaction and investment activity, and basic technical data such as your device and IP address."],
            ["2. How we use it", "We use your information to run your account, process transactions, keep the platform secure, meet legal obligations, and contact you about your account."],
            ["3. Sharing your information", "We do not sell your personal data. We may share it with payment providers, identity-verification services, and authorities where the law requires it."],
            ["4. Security", "We use technical and organisational measures to protect your data. No system is completely secure, so please also protect your own password."],
            ["5. Your rights", "You may ask to access, correct, or delete your personal data, subject to legal and record-keeping requirements."],
            ["6. Cookies", "[Describe the cookies and analytics tools the site uses.]"],
            ["7. Contact", "Privacy questions? Email us at support@bitkastl.com."],
        ],
    },
};

const es: LegalSet = {
    terms: {
        title: "Términos del Servicio",
        sections: [
            ["1. Aceptación de los términos", "Al crear una cuenta o utilizar BitKastl, aceptas estos Términos del Servicio. Si no estás de acuerdo, por favor no utilices la plataforma."],
            ["2. Elegibilidad", "Debes tener al menos 18 años y capacidad legal para celebrar este acuerdo en tu país. Eres responsable de asegurarte de que el uso de BitKastl esté permitido donde vives."],
            ["3. Tu cuenta", "Eres responsable de mantener seguros tus datos de acceso y de toda la actividad de tu cuenta. Avísanos de inmediato si sospechas de un acceso no autorizado."],
            ["4. Inversiones y riesgo", "Todas las inversiones conllevan riesgo, incluida la posible pérdida del capital. El rendimiento pasado no garantiza resultados futuros, y nada en este sitio constituye asesoramiento financiero. Invierte solo dinero que puedas permitirte perder."],
            ["5. Depósitos y retiros", "[Describe los métodos de pago aceptados, los plazos de procesamiento, las comisiones y las condiciones de retiro.]"],
            ["6. Uso prohibido", "No puedes usar BitKastl para lavado de dinero, fraude ni ninguna actividad ilegal, ni intentar interrumpir la plataforma u obtener acceso no autorizado a ella."],
            ["7. Cambios en estos términos", "Podemos actualizar estos términos de vez en cuando. Seguir usando BitKastl después de una actualización significa que aceptas los nuevos términos."],
            ["8. Contacto", "¿Preguntas sobre estos términos? Escríbenos a support@bitkastl.com."],
        ],
    },
    privacy: {
        title: "Política de Privacidad",
        sections: [
            ["1. Información que recopilamos", "Recopilamos los datos que nos das al registrarte (como tu nombre y correo electrónico), tu actividad de transacciones e inversiones, y datos técnicos básicos como tu dispositivo y dirección IP."],
            ["2. Cómo la usamos", "Usamos tu información para gestionar tu cuenta, procesar transacciones, mantener la seguridad de la plataforma, cumplir obligaciones legales y contactarte sobre tu cuenta."],
            ["3. Compartir tu información", "No vendemos tus datos personales. Podemos compartirlos con proveedores de pago, servicios de verificación de identidad y autoridades cuando la ley lo exija."],
            ["4. Seguridad", "Usamos medidas técnicas y organizativas para proteger tus datos. Ningún sistema es completamente seguro, así que protege también tu contraseña."],
            ["5. Tus derechos", "Puedes solicitar acceder a tus datos personales, corregirlos o eliminarlos, sujeto a requisitos legales y de conservación de registros."],
            ["6. Cookies", "[Describe las cookies y herramientas de analítica que usa el sitio.]"],
            ["7. Contacto", "¿Preguntas sobre privacidad? Escríbenos a support@bitkastl.com."],
        ],
    },
};

const fr: LegalSet = {
    terms: {
        title: "Conditions d’utilisation",
        sections: [
            ["1. Acceptation des conditions", "En créant un compte ou en utilisant BitKastl, vous acceptez les présentes Conditions d’utilisation. Si vous n’êtes pas d’accord, veuillez ne pas utiliser la plateforme."],
            ["2. Éligibilité", "Vous devez avoir au moins 18 ans et la capacité juridique de conclure cet accord dans votre pays. Il vous appartient de vérifier que l’utilisation de BitKastl est autorisée là où vous vivez."],
            ["3. Votre compte", "Vous êtes responsable de la sécurité de vos identifiants et de toute activité sur votre compte. Informez-nous immédiatement si vous soupçonnez un accès non autorisé."],
            ["4. Investissements et risques", "Tout investissement comporte des risques, y compris la perte possible du capital. Les performances passées ne garantissent pas les résultats futurs, et rien sur ce site ne constitue un conseil financier. N’investissez que de l’argent que vous pouvez vous permettre de perdre."],
            ["5. Dépôts et retraits", "[Décrivez les moyens de paiement acceptés, les délais de traitement, les frais et les conditions de retrait.]"],
            ["6. Usages interdits", "Vous ne pouvez pas utiliser BitKastl pour le blanchiment d’argent, la fraude ou toute activité illégale, ni tenter de perturber la plateforme ou d’y accéder sans autorisation."],
            ["7. Modification des conditions", "Nous pouvons mettre à jour ces conditions de temps à autre. Continuer à utiliser BitKastl après une mise à jour signifie que vous acceptez les nouvelles conditions."],
            ["8. Contact", "Des questions sur ces conditions ? Écrivez-nous à support@bitkastl.com."],
        ],
    },
    privacy: {
        title: "Politique de confidentialité",
        sections: [
            ["1. Informations que nous collectons", "Nous collectons les informations que vous fournissez lors de l’inscription (comme votre nom et votre e-mail), votre activité de transactions et d’investissement, ainsi que des données techniques de base comme votre appareil et votre adresse IP."],
            ["2. Utilisation", "Nous utilisons vos informations pour gérer votre compte, traiter les transactions, assurer la sécurité de la plateforme, respecter nos obligations légales et vous contacter au sujet de votre compte."],
            ["3. Partage de vos informations", "Nous ne vendons pas vos données personnelles. Nous pouvons les partager avec des prestataires de paiement, des services de vérification d’identité et les autorités lorsque la loi l’exige."],
            ["4. Sécurité", "Nous appliquons des mesures techniques et organisationnelles pour protéger vos données. Aucun système n’est totalement sûr, protégez donc aussi votre mot de passe."],
            ["5. Vos droits", "Vous pouvez demander l’accès à vos données personnelles, leur rectification ou leur suppression, sous réserve des obligations légales et de conservation."],
            ["6. Cookies", "[Décrivez les cookies et outils d’analyse utilisés par le site.]"],
            ["7. Contact", "Des questions sur la confidentialité ? Écrivez-nous à support@bitkastl.com."],
        ],
    },
};

const pt: LegalSet = {
    terms: {
        title: "Termos de Serviço",
        sections: [
            ["1. Aceitação dos termos", "Ao criar uma conta ou utilizar a BitKastl, aceita estes Termos de Serviço. Se não concordar, por favor não utilize a plataforma."],
            ["2. Elegibilidade", "Tem de ter pelo menos 18 anos e capacidade legal para celebrar este acordo no seu país. É responsável por garantir que a utilização da BitKastl é permitida onde vive."],
            ["3. A sua conta", "É responsável por manter seguros os seus dados de acesso e por toda a atividade da sua conta. Informe-nos de imediato se suspeitar de acesso não autorizado."],
            ["4. Investimentos e risco", "Todos os investimentos envolvem risco, incluindo a possível perda do capital. O desempenho passado não garante resultados futuros, e nada neste site constitui aconselhamento financeiro. Invista apenas dinheiro que possa perder."],
            ["5. Depósitos e levantamentos", "[Descreva os métodos de pagamento aceites, os prazos de processamento, as comissões e as condições de levantamento.]"],
            ["6. Utilização proibida", "Não pode utilizar a BitKastl para branqueamento de capitais, fraude ou qualquer atividade ilegal, nem tentar perturbar a plataforma ou aceder-lhe sem autorização."],
            ["7. Alterações a estes termos", "Podemos atualizar estes termos de tempos a tempos. Continuar a utilizar a BitKastl após uma atualização significa que aceita os novos termos."],
            ["8. Contacto", "Dúvidas sobre estes termos? Escreva-nos para support@bitkastl.com."],
        ],
    },
    privacy: {
        title: "Política de Privacidade",
        sections: [
            ["1. Informações que recolhemos", "Recolhemos os dados que nos fornece ao registar-se (como o nome e o e-mail), a sua atividade de transações e investimentos, e dados técnicos básicos como o dispositivo e o endereço IP."],
            ["2. Como as utilizamos", "Utilizamos as suas informações para gerir a sua conta, processar transações, manter a plataforma segura, cumprir obrigações legais e contactá-lo sobre a sua conta."],
            ["3. Partilha das suas informações", "Não vendemos os seus dados pessoais. Podemos partilhá-los com prestadores de pagamento, serviços de verificação de identidade e autoridades quando a lei o exigir."],
            ["4. Segurança", "Utilizamos medidas técnicas e organizativas para proteger os seus dados. Nenhum sistema é totalmente seguro, por isso proteja também a sua palavra-passe."],
            ["5. Os seus direitos", "Pode pedir o acesso, a correção ou a eliminação dos seus dados pessoais, sujeito a requisitos legais e de conservação de registos."],
            ["6. Cookies", "[Descreva os cookies e as ferramentas de análise que o site utiliza.]"],
            ["7. Contacto", "Dúvidas sobre privacidade? Escreva-nos para support@bitkastl.com."],
        ],
    },
};

// Extra languages are loaded from ./legal-text. The file name is the language code.
const files = import.meta.glob("./legal-text/*.ts", { eager: true }) as Record<string, Record<string, LegalSet>>;
const loaded: Partial<Record<Lang, LegalSet>> = {};
for (const [path, mod] of Object.entries(files)) {
    const code = path.split("/").pop()!.replace(".ts", "") as Lang;
    const set = Object.values(mod)[0];
    if (set) loaded[code] = set;
}

export const LEGAL: Partial<Record<Lang, LegalSet>> & { en: LegalSet } = { en, fr, es, pt, ...loaded };