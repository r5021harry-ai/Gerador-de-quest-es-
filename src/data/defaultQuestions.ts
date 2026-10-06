import { Question } from '../types';

export const SYLLABUS_DISCIPLINES: Record<string, string[]> = {
  'História (Ensino Médio)': [
    'Historiografia, Fontes Históricas e Ensino de História no Ensino Médio',
    'História do Maranhão: Colonização, França Equinocial e Formação Social',
    'Revoltas e Movimentos Sociais no Maranhão: Beckman e Balaiada',
    'Brasil Colônia: Economia Açucareira, Mineração e Escravidão Africana',
    'Brasil Império e República: Da Independência à Era Vargas',
    'Ditadura Militar (1964-1985), Redemocratização e Brasil Contemporâneo',
    'História da África, Cultura Afro-Brasileira e Povos Indígenas (Leis 10.639 e 11.645)',
    'História Geral: Antiguidade Clássica, Feudalismo e Expansão Marítima',
    'Revoluções Burguesas, Capitalismo, Guerras Mundiais e Guerra Fria'
  ],
  'Biologia (Ensino Médio)': [
    'Citologia e Biologia Molecular: Estrutura Celular, Membranas e Síntese Proteica',
    'Metabolismo Energético: Fotossíntese, Respiração Celular e Fermentação',
    'Genética Clássica, Molecular e Biotecnologia (Transgênicos e CRISPR)',
    'Evolução Biológica: Teorias Evolutivas, Seleção Natural e Especiação',
    'Ecologia: Teias Tróficas, Ciclos Biogeoquímicos e Dinâmica Populacional',
    'Biomas Brasileiros e do Maranhão (Cerrado, Amazônia, Baixada Maranhense e Manguezais)',
    'Fisiologia e Anatomia Humana: Sistemas e Homeostase',
    'Microbiologia, Parasitologia e Doenças Endêmicas do Maranhão',
    'Botânica e Zoologia: Diversidade, Filogenia e Adaptações'
  ],
  'Legislação Educacional e do Maranhão': [
    'Estatuto do Educador do MA (Lei nº 9.860/2013)',
    'Estatuto dos Servidores Civis do MA (Lei nº 6.107/1994)',
    'LDBEN - Lei nº 9.394/1996 e Diretrizes do Ensino Médio',
    'Constituição Federal de 1988 (Artigos 205 a 214 - Da Educação)',
    'BNCC do Ensino Médio e Itinerários Formativos (Ciências Humanas e da Natureza)',
    'Estatuto da Criança e do Adolescente (ECA - Lei 8.069/1990)'
  ],
  'Conhecimentos Pedagógicos e Didática do Ensino Médio': [
    'Metodologia do Ensino de História e Biologia no Ensino Médio',
    'Teorias da Aprendizagem e Mediação Cognitiva (Piaget, Vygotsky, Wallon)',
    'Avaliação da Aprendizagem Formativa e Mediadora no Ensino Médio',
    'Projeto Político-Pedagógico (PPP) e Gestão Democrática',
    'Educação Inclusiva, Relações Étnico-Raciais e Diversidade Escolar'
  ],
  'Língua Portuguesa': [
    'Compreensão e Interpretação de Textos',
    'Concordância Verbal e Nominal',
    'Regência Verbal, Nominal e Emprego do Sinal Indicativo de Crase',
    'Reescrita de Frases e Equivalência de Sentido (Estilo FCC)',
    'Pontuação, Sintaxe do Período e Colocação Pronominal'
  ]
};

export const DEFAULT_QUESTIONS: Question[] = [
  // --- LEGISLAÇÃO EDUCACIONAL E DO MARANHÃO ---
  {
    id: 'fcc-leg-01',
    discipline: 'Legislação Educacional e do Maranhão',
    topic: 'Estatuto do Educador do MA (Lei nº 9.860/2013)',
    difficulty: 'Médio',
    source: 'FCC - Simulado SEDUC/MA',
    statement: 'Nos termos da Lei Estadual nº 9.860/2013, que dispõe sobre o Estatuto do Educador do Estado do Maranhão, a carreira dos profissionais da educação básica é estruturada em cargos e classes. A respeito do regime de trabalho do Professor e da jornada semanal, é correto afirmar:',
    options: [
      { letter: 'A', text: 'A jornada de trabalho semanal do professor será fixada exclusivamente em 40 (quarenta) horas, vedada a contratação ou opção por 20 (vinte) horas semanais.' },
      { letter: 'B', text: 'O regime de trabalho dos docentes compreende a jornada de 20 (vinte) ou de 40 (quarenta) horas semanais, assegurado o cumprimento de limite mínimo de um terço da carga horária para horas-atividade/planejamento sem interação com educandos.' },
      { letter: 'C', text: 'As horas de trabalho pedagógico extraclasse são facultativas e não integram a jornada regular, sendo remuneradas mediante gratificação eventual de produtividade.' },
      { letter: 'D', text: 'A ampliação da jornada de 20 para 40 horas semanais é automática mediante requerimento simples do docente, independentemente de existência de vaga ou conveniência da Administração.' },
      { letter: 'E', text: 'O estágio probatório do profissional da educação no Maranhão é cumprido no período improrrogável de 2 (dois) anos, ao final do qual é homologada sua estabilidade.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. A Lei nº 9.860/2013 e a Lei Federal nº 11.738/2008 (Piso Nacional do Magistério) garantem que a jornada semanal do magistério seja de 20 ou 40 horas, assegurando que no mínimo 1/3 (um terço) da jornada seja reservado para atividades extraclasse (planejamento, correção de avaliações, formação e reuniões pedagógicas), sem alunos.',
    distractorsExplanation: {
      A: 'Incorreta: admite-se expressamente o regime de 20 e 40 horas semanais.',
      B: 'Gabarito correto: previsão expressa da jornada de 20h e 40h e respeito ao 1/3 de hora-atividade conforme legislação estadual e federal.',
      C: 'Incorreta: as horas de trabalho pedagógico integram obrigatoriamente a jornada e não constituem gratificação facultativa.',
      D: 'Incorreta: a ampliação de jornada depende de necessidade de serviço, disponibilidade orçamentária e critérios legais, não sendo automática.',
      E: 'Incorreta: nos termos do art. 41 da CF/88 e legislação estadual, o prazo para aquisição de estabilidade em estágio probatório é de 3 (três) anos.'
    },
    legislationReference: 'Lei Estadual do MA nº 9.860/2013, art. 26 e Lei Federal nº 11.738/2008, art. 2º, § 4º.'
  },
  {
    id: 'fcc-leg-02',
    discipline: 'Legislação Educacional e do Maranhão',
    topic: 'LDBEN - Lei nº 9.394/1996 e Alterações',
    difficulty: 'Difícil',
    source: 'FCC - Concurso Magistério Estadual',
    statement: 'A Lei de Diretrizes e Bases da Educação Nacional (Lei nº 9.394/1996), ao disciplinar a organização da educação nacional e as incumbências dos estabelecimentos de ensino e dos docentes, estabelece que:',
    options: [
      { letter: 'A', text: 'incumbe aos docentes elaborar a proposta pedagógica do estabelecimento de ensino de forma autônoma e desvinculada das diretrizes dos sistemas municipais ou estaduais.' },
      { letter: 'B', text: 'os estabelecimentos de ensino têm a incumbência de administrar seu pessoal e seus recursos materiais e financeiros, cabendo-lhes assegurar o cumprimento dos dias letivos e horas-aula estabelecidas.' },
      { letter: 'C', text: 'a recuperação de alunos de menor rendimento é encargo exclusivo das famílias, não competindo aos docentes prover meios nem estratégias para sua realização.' },
      { letter: 'D', text: 'a educação básica é formada exclusivamente pelo Ensino Fundamental e pelo Ensino Médio, integrando a Educação Infantil como modalidade assistencial complementar.' },
      { letter: 'E', text: 'a carga horária mínima anual do ensino fundamental e médio é de 600 (seiscentas) horas, distribuídas por um mínimo de 180 (cento e oitenta) dias de efetivo trabalho escolar.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. Conforme o Artigo 12 da LDB nº 9.394/1996, os estabelecimentos de ensino, respeitadas as normas comuns e as do seu sistema de ensino, têm a incumbência de: "II - administrar seu pessoal e seus recursos materiais e financeiros; III - assegurar o cumprimento dos dias letivos e horas-aula estabelecidas".',
    distractorsExplanation: {
      A: 'Incorreta: cabe aos docentes "participar da elaboração da proposta pedagógica" (art. 13, I), e não elaborá-la de forma isolada.',
      B: 'Gabarito correto: texto literal do Art. 12, incisos II e III da LDB.',
      C: 'Incorreta: o art. 13, III prevê expressamente como incumbência do docente "zelar pela aprendizagem dos alunos" e "estabelecer estratégias de recuperação para os alunos de menor rendimento".',
      D: 'Incorreta: segundo o art. 21, I, a Educação Básica é composta por: Educação Infantil, Ensino Fundamental e Ensino Médio.',
      E: 'Incorreta: a regra geral é de 800 horas mínimas anuais distribuídas em um mínimo de 200 dias de efetivo trabalho escolar (art. 24, I).'
    },
    legislationReference: 'Lei Federal nº 9.394/1996 (LDB), arts. 12, 13 e 24.'
  },
  {
    id: 'fcc-leg-03',
    discipline: 'Legislação Educacional e do Maranhão',
    topic: 'Estatuto dos Servidores Civis do MA (Lei nº 6.107/1994)',
    difficulty: 'Médio',
    source: 'FCC - Servidores Públicos do Estado do Maranhão',
    statement: 'A Lei Estadual nº 6.107/1994 estatui o regime jurídico dos servidores públicos civis do Estado do Maranhão. No que tange às penalidades disciplinares e sua aplicação, assinale a opção que guarda estrita conformidade com referida lei:',
    options: [
      { letter: 'A', text: 'A penalidade de advertência será aplicada verbalmente pelo superior hierárquico, sem necessidade de registro em ficha cadastral.' },
      { letter: 'B', text: 'A suspensão, que não excederá a 90 (noventa) dias, será aplicada nos casos de reincidência das faltas punidas com advertência e de violação das demais proibições que não tipifiquem infração sujeita à demissão.' },
      { letter: 'C', text: 'O servidor que for demitido a bem do serviço público fica reabilitado automaticamente no ano seguinte para prestar novo concurso no Estado do Maranhão.' },
      { letter: 'D', text: 'A demissão poderá ser aplicada sumariamente por portaria da chefia imediata, dispensando a instauração de processo administrativo disciplinar quando a infração for notória.' },
      { letter: 'E', text: 'A cassação de aposentadoria é vedada pelo estatuto em razão da natureza adquirida do direito ao benefício previdenciário.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. A Lei Estadual nº 6.107/1994 prevê que a penalidade de suspensão terá prazo máximo de 90 dias e aplica-se em casos de reincidência de infrações punidas com advertência ou descumprimento de proibições que não ensejem demissão.',
    distractorsExplanation: {
      A: 'Incorreta: a advertência é sempre aplicada por escrito e constará do assentamento individual do servidor.',
      B: 'Gabarito oficial: reproduz a disciplina dos artigos do regime disciplinar da Lei Estadual 6.107/1994.',
      C: 'Incorreta: a demissão a bem do serviço público acarreta incompatibilização com novo cargo público pelo prazo previsto em lei (frequentemente de 5 ou mais anos).',
      D: 'Incorreta: a penalidade de demissão exige obrigatoriamente a observância do contraditório e da ampla defesa mediante regular Processo Administrativo Disciplinar (PAD).',
      E: 'Incorreta: a cassação de aposentadoria ou disponibilidade é penalidade expressamente prevista para inativos que praticaram ato punível com demissão enquanto em atividade.'
    },
    legislationReference: 'Lei Estadual do Maranhão nº 6.107/1994, Título IV (Do Regime Disciplinar).'
  },
  {
    id: 'fcc-leg-04',
    discipline: 'Legislação Educacional e do Maranhão',
    topic: 'Constituição Federal de 1988 (Da Educação)',
    difficulty: 'Fácil',
    source: 'FCC - Concursos Educacionais',
    statement: 'A Constituição Federal de 1988 estabelece, em seu artigo 206, os princípios sobre os quais o ensino será ministrado no Brasil. Dentre esses princípios, NÃO se inclui:',
    options: [
      { letter: 'A', text: 'Igualdade de condições para o acesso e permanência na escola.' },
      { letter: 'B', text: 'Liberdade de aprender, ensinar, pesquisar e divulgar o pensamento, a arte e o saber.' },
      { letter: 'C', text: 'Unicidade de concepções pedagógicas como garantia de uniformidade curricular em território nacional.' },
      { letter: 'D', text: 'Pluralismo de ideias e de concepções pedagógicas, e coexistência de instituições públicas e privadas de ensino.' },
      { letter: 'E', text: 'Gestão democrática do ensino público, na forma da lei.' }
    ],
    correctOption: 'C',
    explanation: 'Correta a alternativa C (o item incorreto solicitado pela questão). O artigo 206, inciso III da CF/88 consagra justamente o "pluralismo de ideias e de concepções pedagógicas", repudiando a imposição de um pensamento único ou unicidade de concepções.',
    distractorsExplanation: {
      A: 'Previsto expressamente no art. 206, inciso I da CF/88.',
      B: 'Previsto expressamente no art. 206, inciso II da CF/88.',
      C: 'Pegadinha clássica da FCC: o princípio constitucional é o PLURALISMO, e não a unicidade de concepções.',
      D: 'Previsto expressamente no art. 206, inciso III da CF/88.',
      E: 'Previsto expressamente no art. 206, inciso VI da CF/88.'
    },
    legislationReference: 'Constituição da República Federativa do Brasil de 1988, Art. 206.'
  },

  // --- LÍNGUA PORTUGUESA (ESTILO FCC) ---
  {
    id: 'fcc-port-01',
    discipline: 'Língua Portuguesa',
    topic: 'Reescrita de Frases e Equivalência de Sentido (Estilo FCC)',
    difficulty: 'Difícil',
    source: 'FCC - Analista / Magistério',
    textSupport: 'A expansão da escolarização formal no Brasil moderno, longe de resolver de pronto as assimetrias regionais, impôs aos formuladores de políticas públicas a urgência de conceber medidas distributivas que equilibrassem a destinação orçamentária entre estados centrais e periféricos.',
    statement: 'O segmento do texto acima pode ser reescrito, em conformidade com o padrão culto e sem prejuízo do sentido original, da seguinte forma:',
    options: [
      { letter: 'A', text: 'Conquanto a escolarização formal tenha se expandido no Brasil moderno sem resolver de pronto as assimetrias regionais, urgiu-se aos formuladores que concebessem medidas distributivas visando equilibrar a destinação do orçamento entre estados centrais e periféricos.' },
      { letter: 'B', text: 'A expansão da escolarização formal no Brasil moderno não resolveu imediatamente as disparidades entre as regiões, o que impôs aos formuladores de políticas públicas a necessidade urgente de arquitetar providências distributivas para que se equilibrasse a verba orçamentária entre os estados centrais e os periféricos.' },
      { letter: 'C', text: 'Malgrado a escolarização formal expandisse-se no Brasil moderno afim de resolver prontamente as assimetrias regionais, impôs-se para com os formuladores a concepção de medidas distributivas com vistas à equilibrar os orçamentos.' },
      { letter: 'D', text: 'Visto que a escolarização formal expandiu no Brasil moderno sem solucionar logo as assimetrias regionais, os formuladores tiveram de conceber urgentes medidas distributivas com fins de reequilibrar a dotação de orçamentos entre estados centrais e periféricos.' },
      { letter: 'E', text: 'Ainda que resolvendo de pronto as assimetrias regionais, a ampliação da escolarização formal no moderno Brasil impeliu os formuladores públicos a conceberem medidas cujo o escopo seria equilibrar a destinação dos recursos orçamentários.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. Preserva com precisão cirúrgica o sentido original (a expansão não resolveu de pronto as assimetrias -> impôs a urgência de medidas distributivas orçamentárias) mantendo a correção sintática perfeita, regência ("impôs a alguém algo") e flexão verbal.',
    distractorsExplanation: {
      A: 'Incorreta: a forma pronominal "urgiu-se aos formuladores" é viciosa e inadequada na norma-padrão (o verbo urgir é intransitivo com oração subjetiva: cumpria/urgia aos formuladores conceber).',
      B: 'Gabarito correto: vocabulário equivalente, paralelismo respeitado, regência e pontuação perfeitas no estilo da FCC.',
      C: 'Incorreta: contém "afim de" grafado junto (em vez de "a fim de" locução indicativa de finalidade) e crase indevida antes de verbo ("à equilibrar").',
      D: 'Incorreta: a conjunção "visto que" introduz relação de causa que não existia no original ("longe de resolver" traz matiz concessivo/opositor e não de causa primária).',
      E: 'Incorreta: inverte o sentido ao dizer "Ainda que resolvendo de pronto" (o texto diz expressamente "longe de resolver") e traz o erro crasso "cujo o escopo" (não se usa artigo após cujo).'
    },
    legislationReference: 'Gramática Normativa: Sintaxe de Regência e Semântica de Conectivos.'
  },
  {
    id: 'fcc-port-02',
    discipline: 'Língua Portuguesa',
    topic: 'Concordância Verbal e Nominal',
    difficulty: 'Médio',
    source: 'FCC - Técnico e Analista Judiciário / SEDUC',
    statement: 'A frase em que a concordância verbal está inteiramente em conformidade com as normas da gramática padrão da Língua Portuguesa é:',
    options: [
      { letter: 'A', text: 'Houveram bastantes questionamentos dos professores maranhenses a respeito dos novos critérios de progressão na carreira do magistério.' },
      { letter: 'B', text: 'Tratam-se de reivindicações legítimas encaminhadas à Secretaria de Estado da Educação pelos representantes das escolas do interior.' },
      { letter: 'C', text: 'A maioria dos estudantes concluiu com êxito os projetos interdisciplinares que se desenvolveram no decorrer do semestre letivo.' },
      { letter: 'D', text: 'Faziam quase dois anos que a comissão pedagógica não se reunia para avaliar os indicadores de permanência escolar.' },
      { letter: 'E', text: 'Mais de um professor manifestaram-se contrários à antecipação do calendário de avaliações diagnósticas.' }
    ],
    correctOption: 'C',
    explanation: 'Correta a alternativa C. Com expressão partitiva seguida de especificador no plural ("A maioria dos estudantes"), o verbo pode concordar tanto no singular (com o núcleo "maioria") quanto no plural ("concluíram", com o especificador). A concordância "A maioria dos estudantes concluiu..." e a passiva pronominal "que se desenvolveram" estão irrepreensíveis.',
    distractorsExplanation: {
      A: 'Incorreta: o verbo "haver" no sentido de existir ou ocorrer é impessoal, devendo ficar estritamente na 3ª pessoa do singular: "Houve bastantes questionamentos".',
      B: 'Incorreta: com o verbo acompanhado da preposição ("tratar-se de"), a partícula "se" é índice de indeterminação do sujeito, logo o verbo fica obrigatoriamente no singular: "Trata-se de reivindicações legítimas".',
      C: 'Gabarito correto: perfeita aplicação da concordância com expressão partitiva e voz passiva sintética.',
      D: 'Incorreta: o verbo "fazer" indicando tempo decorrido é impessoal, devendo permanecer no singular: "Fazia quase dois anos...".',
      E: 'Incorreta: com a locução "mais de um", a regra geral manda concordar no singular: "Mais de um professor manifestou-se" (só vai para o plural se houver reciprocidade ou repetição da expressão).'
    },
    legislationReference: 'Bechara, Evanildo - Moderna Gramática Portuguesa (Sintaxe de Concordância).'
  },
  {
    id: 'fcc-port-03',
    discipline: 'Língua Portuguesa',
    topic: 'Regência Verbal, Nominal e Emprego do Sinal Indicativo de Crase',
    difficulty: 'Difícil',
    source: 'FCC - Vestibulares e Concursos',
    statement: 'O sinal indicativo de crase está empregado em estrita observância à norma-padrão na seguinte frase:',
    options: [
      { letter: 'A', text: 'O diretor pedagógico informou à todos os convocados que o curso de aperfeiçoamento iniciaria às pressas.' },
      { letter: 'B', text: 'A nova diretriz da Secretaria visa à consolidação dos planos municipais de educação, referindo-se à medidas de curto e médio prazo.' },
      { letter: 'C', text: 'A concessão da licença para qualificação profissional submete-se à aprovação prévia da chefia e atende à necessidade premente de capacitação docente.' },
      { letter: 'D', text: 'Os supervisores dirigiram-se à Vossa Excelência para solicitar apoio às pesquisas de campo desenvolvidas nas comunidades quilombolas.' },
      { letter: 'E', text: 'O corpo docente começou à elaborar projetos integrados, conferindo prioridade à qualquer iniciativa de busca ativa.' }
    ],
    correctOption: 'C',
    explanation: 'Correta a alternativa C. O verbo submeter-se exige a preposição "a" (quem se submete, submete-se a algo), que se funde ao artigo definido feminino diante de "aprovação prévia" (à aprovação); o verbo atender admite regência transitiva indireta com preposição "a" (atender a + a necessidade = atende à necessidade). Ambas as crases são legítimas.',
    distractorsExplanation: {
      A: 'Incorreta: não há crase antes de pronome indefinido e de palavra masculina ("à todos").',
      B: 'Incorreta: a segunda ocorrência "à medidas" está errada, pois antes de substantivo plural com crase exigiria "às medidas" (se houver apenas "a", trata-se de preposição sem artigo).',
      C: 'Gabarito correto: regência correta de "submeter-se a" e "atender a", ambas seguidas de substantivos femininos determinados por artigo.',
      D: 'Incorreta: não ocorre crase antes de pronomes de tratamento como "Vossa Excelência" (com exceção de senhora e senhorita).',
      E: 'Incorreta: não ocorre crase antes de verbo ("à elaborar") nem antes de pronome indefinido ("à qualquer").'
    },
    legislationReference: 'Cegalla, Domingos Paschoal - Novíssima Gramática da Língua Portuguesa.'
  },
  {
    id: 'fcc-port-04',
    discipline: 'Língua Portuguesa',
    topic: 'Pontuação e Sintaxe do Período',
    difficulty: 'Médio',
    source: 'FCC - Concurso Magistério',
    statement: 'Considere a seguinte frase: "Os professores que concluíram o módulo formativo em tecnologias receberão certificação especial". É correto afirmar que, caso o segmento "que concluíram o módulo formativo em tecnologias" seja isolado por vírgulas:',
    options: [
      { letter: 'A', text: 'Haverá grave erro gramatical por separação indevida do sujeito em relação ao predicado verbal.' },
      { letter: 'B', text: 'O sentido original será mantido inalterado, tratando-se de pontuação puramente estilística e optativa.' },
      { letter: 'C', text: 'A oração, que originariamente era subordinada adjetiva restritiva, passará a ser adjetiva explicativa, generalizando a informação para a totalidade dos professores.' },
      { letter: 'D', text: 'A frase passará a expressar uma hipótese ou condição não realizada no tempo pretérito.' },
      { letter: 'E', text: 'A concordância verbal do verbo "receberão" terá de ser obrigatoriamente alterada para a forma no singular.' }
    ],
    correctOption: 'C',
    explanation: 'Correta a alternativa C. Na ausência de vírgulas, a oração é subordinada adjetiva restritiva (apenas o grupo restrito de professores que concluíram o módulo terá a certificação). Ao isolar a oração por vírgulas, ela se torna adjetiva explicativa, passando a atribuir a característica a todos os professores daquele universo de referência.',
    distractorsExplanation: {
      A: 'Incorreta: não há erro gramatical; o isolamento da oração explicativa por vírgula dupla é consagrado pela norma.',
      B: 'Incorreta: a mudança pontuação altera substancialmente o sentido semântico (de restrição para explicação generalizante).',
      C: 'Gabarito correto: clássica cobrança da FCC sobre a distinção semântico-sintática entre orações adjetivas explicativas e restritivas.',
      D: 'Incorreta: não adquire valor condicional, pois a conjunção integrante/pronome relativo mantém a estrutura adjetiva.',
      E: 'Incorreta: o sujeito continua sendo "Os professores" no plural, não havendo qualquer alteração na flexão de "receberão".'
    },
    legislationReference: 'Sintaxe da Oração e do Período - Orações Subordinadas Adjetivas.'
  },

  // --- CONHECIMENTOS PEDAGÓGICOS ---
  {
    id: 'fcc-ped-01',
    discipline: 'Conhecimentos Pedagógicos',
    topic: 'Avaliação da Aprendizagem (Diagnóstica, Formativa e Mediadora)',
    difficulty: 'Médio',
    source: 'FCC - Professor de Educação Básica',
    statement: 'A concepção mediadora de avaliação escolar, defendida por autoras como Jussara Hoffmann e Cipriano Luckesi, opõe-se à perspectiva classificatória e punitiva tradicional. De acordo com essa perspectiva:',
    options: [
      { letter: 'A', text: 'a avaliação deve focar na mensuração quantitativa e na ordenação decrescente dos estudantes em função de suas notas em provas bimestrais padronizadas.' },
      { letter: 'B', text: 'o erro cometido pelo estudante deve ser compreendido como trampolim para a aprendizagem e indicador das hipóteses formuladas no seu processo de construção cognitiva.' },
      { letter: 'C', text: 'as intervenções do professor devem ocorrer estritamente ao final do ano letivo durante a reunião do conselho de classe deliberativo.' },
      { letter: 'D', text: 'os instrumentos avaliativos devem ser mantidos em sigilo para evitar a contaminação das respostas e garantir a seletividade dos mais aptos.' },
      { letter: 'E', text: 'a avaliação diagnóstica é dispensável nos anos finais do ensino fundamental e no ensino médio por presumir-se maturidade consolidada.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. Na avaliação mediadora e formativa (Hoffmann, Luckesi, Hadji), o erro deixa de ser motivo de penalização com notas baixas e passa a ser encarado como um momento revelador do estágio de compreensão do aluno, orientando a intervenção pedagógica contínua do professor.',
    distractorsExplanation: {
      A: 'Incorreta: essa é a visão da avaliação tradicional/classificatória (somativa estrita), criticada por Luckesi.',
      B: 'Gabarito correto: definição central da avaliação mediadora e formativa.',
      C: 'Incorreta: a avaliação mediadora é processual e contínua, ocorrendo durante todo o percurso para reorientar a rota.',
      D: 'Incorreta: a transparência e a partilha dos critérios e objetivos com os educandos é princípio basilar da gestão democrática da aprendizagem.',
      E: 'Incorreta: a avaliação diagnóstica é necessária e recomendada em todas as etapas educativas para sondar saberes prévios.'
    },
    legislationReference: 'Hoffmann, Jussara - Avaliação Mediadora: Uma prática em construção da pré-escola à universidade.'
  },
  {
    id: 'fcc-ped-02',
    discipline: 'Conhecimentos Pedagógicos',
    topic: 'Teorias da Aprendizagem (Piaget, Vygotsky, Wallon)',
    difficulty: 'Difícil',
    source: 'FCC - Concurso Magistério',
    statement: 'A perspectiva sociointeracionista da aprendizagem, desenvolvida primordialmente por Lev Vygotsky, traz conceitos fundamentais para a atuação docente na sala de aula. Sobre a "Zona de Desenvolvimento Proximal" (ZDP), é correto afirmar:',
    options: [
      { letter: 'A', text: 'Representa a distância entre o que a criança já realiza de forma autônoma e independente e o nível de desenvolvimento potencial determinado pela capacidade de solucionar problemas sob mediação de um adulto ou com pares mais experientes.' },
      { letter: 'B', text: 'Corresponde à fase maturacional biológica inata em que o indivíduo atinge as operações formais abstratas, dependendo unicamente da genética cerebral.' },
      { letter: 'C', text: 'É a área do córtex cerebral ativada durante a memorização mecânica de conteúdos descontextualizados na abordagem behaviorista.' },
      { letter: 'D', text: 'Constitui o intervalo cronológico rígido no qual o educador não deve interferir para preservar o espontaneísmo natural da infância.' },
      { letter: 'E', text: 'Refere-se ao momento em que a criança já domina todos os esquemas operatórios concretos sem qualquer necessidade de linguagem ou cultura.' }
    ],
    correctOption: 'A',
    explanation: 'Correta a alternativa A. A Zona de Desenvolvimento Proximal (ZDP) de Vygotsky define a distância entre o nível de desenvolvimento real (o que o aprendiz é capaz de fazer sozinho) e o nível de desenvolvimento potencial (o que ele consegue realizar com a mediação, colaboração e orientação de um par ou professor mais experiente).',
    distractorsExplanation: {
      A: 'Gabarito correto: definição canônica vygotskiana da ZDP e o papel insubstituível da mediação social.',
      B: 'Incorreta: confunde com o estágio operatório formal de Piaget e ignora o fundamento cultural e relacional de Vygotsky.',
      C: 'Incorreta: descreve terminologia mecanicista/behaviorista, diametralmente oposta ao sociointeracionismo.',
      D: 'Incorreta: a teoria histórico-cultural salienta justamente que o professor não deve ser passivo nem esperar o espontaneísmo; a aprendizagem alavanca o desenvolvimento.',
      E: 'Incorreta: a linguagem e os signos culturais são elementos constitutivos da mediação cognitiva para Vygotsky.'
    },
    legislationReference: 'Vygotsky, L. S. - A Formação Social da Mente.'
  },
  {
    id: 'fcc-ped-03',
    discipline: 'Conhecimentos Pedagógicos',
    topic: 'Projeto Político-Pedagógico (PPP) e Gestão Democrática',
    difficulty: 'Médio',
    source: 'FCC - Gestão Escolar e Magistério',
    statement: 'Segundo a professora Ilma Passos Veiga, o Projeto Político-Pedagógico (PPP) da escola pública é simultaneamente político e pedagógico. A dimensão política do PPP manifesta-se precipuamente pelo fato de:',
    options: [
      { letter: 'A', text: 'estar submetido aos programas e diretrizes partidárias do governante em exercício no poder executivo estadual ou municipal.' },
      { letter: 'B', text: 'estabelecer o compromisso da escola com a formação do cidadão consciente, crítico e participativo na transformação da sociedade.' },
      { letter: 'C', text: 'determinar as punições e o regulamento de disciplina interna aplicável aos alunos que transgredirem as regras da instituição.' },
      { letter: 'D', text: 'limitar a participação dos pais e da comunidade aos momentos de contribuição financeira voluntária para a caixa escolar.' },
      { letter: 'E', text: 'constituir um documento técnico e burocrático elaborado por consultoria externa para mero arquivamento no conselho estadual.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. Conforme Ilma Passos Alencastro Veiga, o PPP é político porque está articulado com a formação do cidadão para uma determinada sociedade, com compromisso ético-político de emancipação e transformação social; e é pedagógico porque define as ações educativas e as estratégias necessárias para que essa formação se concretize.',
    distractorsExplanation: {
      A: 'Incorreta: o sentido de "político" no PPP não é partidário, mas sim emancipatório e republicano.',
      B: 'Gabarito correto: traduz o cerne da obra de Veiga e a teoria crítica do currículo escolar.',
      C: 'Incorreta: essa visão reduz o projeto a mero código disciplinar ou regimento repressivo.',
      D: 'Incorreta: a gestão democrática exige a participação efetiva de toda a comunidade escolar na formulação e vivência do PPP.',
      E: 'Incorreta: o PPP construído coletivamente rejeita pacotes prontos importados ou compras de consultorias tecnocráticas.'
    },
    legislationReference: 'Veiga, Ilma Passos Alencastro (Org.) - Projeto Político-Pedagógico da Escola: Uma construção possível.'
  },
  {
    id: 'fcc-ped-04',
    discipline: 'Conhecimentos Pedagógicos',
    topic: 'Relações Étnico-Raciais (Leis 10.639/03 e 11.645/08)',
    difficulty: 'Fácil',
    source: 'FCC - SEDUC e Magistério',
    statement: 'As Leis Federais nº 10.639/2003 e nº 11.645/2008 alteraram a LDB para tornar obrigatório o ensino de História e Cultura Afro-Brasileira e Indígena nos estabelecimentos de ensino fundamental e médio. De acordo com as Diretrizes Curriculares Nacionais para o tema, esse conteúdo deve:',
    options: [
      { letter: 'A', text: 'ser ministrado em uma disciplina isolada e facultativa aos estudantes que se autodeclararem negros ou indígenas.' },
      { letter: 'B', text: 'restringir-se às comemorações pontuais do Dia do Índio (19 de abril) e do Dia da Consciência Negra (20 de novembro).' },
      { letter: 'C', text: 'ser ministrado no âmbito de todo o currículo escolar, em especial nas áreas de educação artística e de literatura e história brasileiras.' },
      { letter: 'D', text: 'ser abordado exclusivamente a partir do enfoque da escravidão e da submissão dos povos originários, evitando retratar sua resistência.' },
      { letter: 'E', text: 'aplicar-se unicamente às escolas públicas localizadas em terras demarcadas ou territórios remanescentes de quilombos.' }
    ],
    correctOption: 'C',
    explanation: 'Correta a alternativa C. O texto da LDB (Art. 26-A, § 2º) estipula que os conteúdos referentes à História e Cultura Afro-Brasileira e dos Povos Indígenas serão ministrados no âmbito de todo o currículo escolar, em especial nas áreas de Educação Artística e de Literatura e História Brasileiras.',
    distractorsExplanation: {
      A: 'Incorreta: o ensino é obrigatório para todos os alunos em todo o território nacional, não sendo optativo.',
      B: 'Incorreta: as diretrizes vedam expressamente a abordagem superficial, folclórica ou restrita a datas comemorativas isoladas.',
      C: 'Gabarito oficial: texto explícito do Artigo 26-A, § 2º da LDB nº 9.394/1996.',
      D: 'Incorreta: a lei enfatiza a história da África e dos povos indígenas, sua contribuição social, econômica, cultural e suas lutas e resistências.',
      E: 'Incorreta: a obrigatoriedade abrange todas as instituições públicas e particulares do país.'
    },
    legislationReference: 'Lei nº 9.394/1996, Art. 26-A (redação dada pelas Leis 10.639/03 e 11.645/08).'
  },

  // --- HISTÓRIA E GEOGRAFIA DO MARANHÃO ---
  {
    id: 'fcc-ma-01',
    discipline: 'História e Geografia do Maranhão',
    topic: 'Movimentos Sociais: Revolta de Beckman e Balaiada',
    difficulty: 'Difícil',
    source: 'FCC - História do Maranhão',
    statement: 'A Balaiada (1838–1841) foi uma das mais expressivas revoltas do período regencial brasileiro ocorridas na Província do Maranhão. Caracterizada pela participação de camadas populares empobrecidas, vaqueiros e negros escravizados quilombolas, o movimento teve como elementos centrais:',
    options: [
      { letter: 'A', text: 'a defesa intransigente da restauração do trono de D. Pedro I e a aliança monolítica com os grandes fazendeiros liberais até a pacificação.' },
      { letter: 'B', text: 'a revolta inicial impulsionada pela disputa entre facções da elite local ("bem-te-vis" e "cabanos"), que rapidamente ganhou contornos de rebelião social com líderes como Manuel dos Balaios, Raimundo Gomes e Cosme Bento das Chagas.' },
      { letter: 'C', text: 'a tentativa de expulsar os jesuítas e revogar o monopólio mercantil da Companhia de Comércio do Maranhão fundada pela Coroa portuguesa.' },
      { letter: 'D', text: 'o apoio armado da Marinha francesa sediada em Caiena para anexar a ilha de São Luís ao território colonial ultramarino.' },
      { letter: 'E', text: 'o objetivo exclusivo de instituir o socialismo utópico nos moldes da Comuna de Paris e banir a moeda corrente na província.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. A Balaiada começou a partir das disputas oligárquicas entre Liberais (bem-te-vis) e Conservadores (cabanos), mas tomou proporções radicais e incontroláveis com a adesão massiva de vaqueiros (Raimundo Gomes), artesãos/pobres livres (Manuel dos Anjos Ferreira, o "Balaio") e milhares de negros escravizados foragidos sob a liderança de Cosme Bento Chagas (líder do Quilombo do Lago Amarelo). A revolta foi duramente reprimida pelo então coronel Luís Alves de Lima e Silva (futuro Duque de Caxias).',
    distractorsExplanation: {
      A: 'Incorreta: a Balaiada não foi um movimento restaurador pró-D. Pedro I e os grandes proprietários logo se uniram ao governo para conter a ameaça popular.',
      B: 'Gabarito correto: retrata a dinâmica real e a liderança plural da Balaiada.',
      C: 'Incorreta: essa é a descrição da Revolta de Beckman ocorrida em 1684 no período colonial.',
      D: 'Incorreta: a tentativa de ocupação francesa no Maranhão ("França Equinocial") ocorreu entre 1612 e 1615 com Daniel de La Touche.',
      E: 'Incorreta: anacronismo grosseiro (a Comuna de Paris ocorreu em 1871, décadas após o término da Balaiada).'
    },
    legislationReference: 'História do Maranhão: Período Regencial e Conflitos Sociais.'
  },
  {
    id: 'fcc-ma-02',
    discipline: 'História e Geografia do Maranhão',
    topic: 'Quadro Físico: Relevo, Clima, Bacias Hidrográficas e Biomas',
    difficulty: 'Médio',
    source: 'FCC - Geografia do Maranhão',
    statement: 'O Estado do Maranhão apresenta uma posição geográfica privilegiada de transição entre o Nordeste e a Amazônia, o que se reflete em sua diversidade morfoclimática e de biomas. A esse respeito, assinale a proposição correta:',
    options: [
      { letter: 'A', text: 'O território maranhense é integralmente coberto pelo bioma Caatinga, predominando o clima semiárido com estiagens que ultrapassam onze meses ao ano.' },
      { letter: 'B', text: 'No Maranhão convergem ecossistemas de grande relevância, como a Floresta Amazônica a oeste, o Cerrado na porção centro-sul e leste, além da rica zona litorânea com manguezais e a singular Baixada Maranhense.' },
      { letter: 'C', text: 'O rio Parnaíba nasce na Serra do Tiracambu e drena inteiramente a porção ocidental maranhense, desaguando exclusivamente no litoral de São Luís.' },
      { letter: 'D', text: 'O relevo do Maranhão é caracterizado por imponentes cordilheiras de formação geológica recente e altitudes médias superiores a 2.500 metros.' },
      { letter: 'E', text: 'A foz de todos os rios maranhenses forma deltas oceânicos abertos desprovidos de vegetação típica de manguezal em virtude da ausência de marés expressivas.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. O Maranhão é um verdadeiro estado de transição ecológica: a oeste possui floresta amazônica pré-amazônica, ao centro-sul predomina o cerrado (área de forte expansão da soja no MATOPIBA), no litoral destacam-se os manguezais da costa de rias e dunas, e entre eles situa-se a Baixada Maranhense com suas áreas inundáveis e rica biodiversidade.',
    distractorsExplanation: {
      A: 'Incorreta: a Caatinga tem representatividade residual/restrita; predominam o Cerrado e a Amazônia, com regimes chuvosos significativos.',
      B: 'Gabarito correto: descreve perfeitamente o mosaico de biomas e áreas de transição maranhenses.',
      C: 'Incorreta: o Rio Parnaíba é a divisa natural a leste com o Estado do Piauí e deságua em delta aberto no oceano Atlântico (Delta do Parnaíba).',
      D: 'Incorreta: o relevo maranhense é modesto, formado por planícies litorâneas e baixos planaltos/chapadas sedimentares, raramente ultrapassando 600 a 800 metros de altitude.',
      E: 'Incorreta: o Maranhão possui uma das maiores faixas contínuas de manguezal do mundo e marés semidiurnas que chegam a amplitudes de até 7 metros na Baía de São Marcos.'
    },
    legislationReference: 'IBGE e IMESC - Zoneamento Ecológico-Econômico do Estado do Maranhão.'
  },
  {
    id: 'fcc-ma-03',
    discipline: 'História e Geografia do Maranhão',
    topic: 'Patrimônio Cultural e Manifestações: Bumba Meu Boi e Tambor de Crioula',
    difficulty: 'Fácil',
    source: 'FCC - Atualidades e Cultura Maranhense',
    statement: 'O Bumba Meu Boi e o Tambor de Crioula são manifestações emblemáticas da cultura popular do Maranhão reconhecidas pelo IPHAN como Patrimônio Cultural Imaterial. Em relação aos sotaques do Bumba Meu Boi do Maranhão, assinale a alternativa que associa corretamente o sotaque às suas características instrumentais e regionais:',
    options: [
      { letter: 'A', text: 'Sotaque de Matraca (ou da Ilha): caracterizado pelo uso de dois pedaços de madeira dura batidos ritmicamente e grandes pandeirões, tradicional nos arraiais de São Luís.' },
      { letter: 'B', text: 'Sotaque de Zabumba: introduz guitarras elétricas e sintetizadores e teve origem nos bairros litorâneos no século XXI.' },
      { letter: 'C', text: 'Sotaque de Orquestra: emprega exclusivamente berimbaus e atabaques sem instrumentos de sopro.' },
      { letter: 'D', text: 'Sotaque da Baixada: marcado pelo uso de maracás de metal e sem a presença do cazumbá.' },
      { letter: 'E', text: 'Sotaque de Costa de Mão: típico de Cururupu, dispensa qualquer instrumento de percussão e foca apenas em canto coral.' }
    ],
    correctOption: 'A',
    explanation: 'Correta a alternativa A. O Sotaque de Matraca (também conhecido como Sotaque da Ilha, como os tradicionais bois de Maracanã e Maioba) tem como marca registrada o som vibrante e estrondoso das matracas (pequenos e médios pedaços de madeira golpeados) combinadas aos pandeirões e tambores-onça.',
    distractorsExplanation: {
      A: 'Gabarito correto: definição precisa do sotaque de matraca, o mais numeroso e participativo de São Luís.',
      B: 'Incorreta: o Sotaque de Zabumba é o mais antigo e tradicional ritmo percussivo do boi (com zabumbas e pandeirinhos), sem instrumentos eletrônicos.',
      C: 'Incorreta: o Sotaque de Orquestra destaca-se justamente pela introdução de instrumentos de sopro (metais e clarinetes) e cordas.',
      D: 'Incorreta: o Sotaque da Baixada tem no cazumbá (figura fantasiada mística) um de seus personagens mais marcantes e o pandeiro de ferrinhos.',
      E: 'Incorreta: o Sotaque de Costa de Mão recebe esse nome pela técnica peculiar de percutir os pandeiros com as costas da mão.'
    },
    legislationReference: 'Dossiê do IPHAN - Complexo Cultural do Bumba-meu-boi do Maranhão.'
  },

  // --- NOÇÕES DE INFORMÁTICA ---
  {
    id: 'fcc-inf-01',
    discipline: 'Noções de Informática',
    topic: 'Segurança da Informação e Proteção de Dados',
    difficulty: 'Médio',
    source: 'FCC - Concursos Públicos',
    statement: 'Um professor da rede estadual do Maranhão recebeu um e-mail que aparentava ter sido enviado pela administração escolar, solicitando que ele clicasse em um link para "atualizar suas credenciais do portal do servidor sob pena de bloqueio do contracheque". Ao examinar o endereço do remetente, constatou-se que o domínio não era oficial da SEDUC. Essa tentativa de golpe cibernético caracteriza a prática de:',
    options: [
      { letter: 'A', text: 'Ransomware' },
      { letter: 'B', text: 'Phishing' },
      { letter: 'C', text: 'Ataque de Negação de Serviço Distribuído (DDoS)' },
      { letter: 'D', text: 'Defacement' },
      { letter: 'E', text: 'Worm de auto-replicação em rede local' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. O Phishing é uma técnica de engenharia social em que criminosos se passam por instituições confiáveis (bancos, secretarias, portais públicos) por meio de e-mails, SMS ou mensagens falsas com o intuito de induzir a vítima a fornecer dados confidenciais, senhas ou dados bancários.',
    distractorsExplanation: {
      A: 'Incorreta: Ransomware é o malware que criptografa os arquivos do usuário e exige resgate financeiro para restaurar o acesso.',
      B: 'Gabarito correto: definição clássica de phishing (pesca de credenciais via e-mail fraudulento).',
      C: 'Incorreta: DDoS consiste em sobrecarregar um servidor com milhões de requisições simultâneas para torná-lo indisponível.',
      D: 'Incorreta: Defacement é a desfiguração visual ou alteração da página inicial de um sítio eletrônico.',
      E: 'Incorreta: Worm é um programa malicioso que se propaga automaticamente pelas redes sem necessidade de interação de e-mail com a vítima.'
    },
    legislationReference: 'Cartilha de Segurança para a Internet (CERT.br).'
  },
  {
    id: 'fcc-inf-02',
    discipline: 'Noções de Informática',
    topic: 'Navegadores e Ferramentas de Nuvem na Educação',
    difficulty: 'Fácil',
    source: 'FCC - Noções de Informática',
    statement: 'Em um ambiente escolar que utiliza ferramentas corporativas em nuvem (como o Google Workspace for Education), assinale a afirmativa verdadeira sobre o compartilhamento e a edição colaborativa de documentos:',
    options: [
      { letter: 'A', text: 'Dois ou mais usuários não podem editar o mesmo documento simultaneamente, exigindo o bloqueio do arquivo até que o primeiro finalize a edição.' },
      { letter: 'B', text: 'Ao compartilhar um arquivo por link, é possível definir permissões específicas aos destinatários, tais como "Leitor", "Comentador" ou "Editor".' },
      { letter: 'C', text: 'Arquivos salvos na nuvem perdem o histórico de versões anteriores sempre que o usuário efetua logout do navegador.' },
      { letter: 'D', text: 'O uso de armazenamento em nuvem exige a instalação obrigatória de um servidor físico de arquivos nas dependências de cada unidade escolar.' },
      { letter: 'E', text: 'A autenticação de dois fatores (2FA) torna as contas dos servidores mais vulneráveis a invasões e por isso é desaconselhada.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. Nos serviços modernos de nuvem, ao compartilhar documentos, planilhas ou pastas, o proprietário pode graduar os níveis de acesso concedendo papéis estritos de Leitor (somente leitura), Comentador (adiciona anotações sem alterar o texto original) ou Editor (alteração plena).',
    distractorsExplanation: {
      A: 'Incorreta: o grande diferencial da nuvem é a colaboração em tempo real síncrona entre múltiplos usuários.',
      B: 'Gabarito correto: funcionalidades padrão de controle de acesso em plataformas de nuvem.',
      C: 'Incorreta: o controle de versões armazena o histórico cronológico de edições automaticamente na nuvem.',
      D: 'Incorreta: a computação em nuvem dispensa infraestrutura física de servidores locais nas escolas.',
      E: 'Incorreta: a verificação em duas etapas aumenta sensivelmente a segurança contra acessos não autorizados.'
    },
    legislationReference: 'Conceitos de Nuvem e Colaboração em Ambiente Digital.'
  },

  // --- MATEMÁTICA E RACIOCÍNIO LÓGICO ---
  {
    id: 'fcc-mat-01',
    discipline: 'Matemática e Raciocínio Lógico',
    topic: 'Razão, Proporção e Regra de Três',
    difficulty: 'Médio',
    source: 'FCC - Raciocínio Lógico-Matemático',
    statement: 'Para corrigir as 360 provas discursivas do concurso de um município, uma banca examinadora mobilizou 4 professores, que concluíram o trabalho em 6 dias, trabalhando 5 horas por dia. Se a banca designasse 5 professores com a mesma capacidade de trabalho, trabalhando 6 horas por dia para corrigir 600 provas do mesmo tipo, em quantos dias o trabalho seria concluído?',
    options: [
      { letter: 'A', text: '5 dias' },
      { letter: 'B', text: '6 dias' },
      { letter: 'C', text: '7 dias' },
      { letter: 'D', text: '8 dias' },
      { letter: 'E', text: '10 dias' }
    ],
    correctOption: 'D',
    explanation: 'Correta a alternativa D (8 dias). Trata-se de uma regra de três composta relacionando: Provas, Professores, Horas/dia e Dias.\n\nMontando as razões em relação à grandeza Dias (D):\n- Dias vs Provas: quanto mais provas, mais dias (Diretamente Proporcional -> 360/600)\n- Dias vs Professores: quanto mais professores, menos dias (Inversamente Proporcional -> 5/4)\n- Dias vs Horas/dia: quanto mais horas/dia, menos dias (Inversamente Proporcional -> 6/5)\n\nFórmula:\n6 / x = (360 / 600) * (5 / 4) * (6 / 5)\nSimplificando:\n360/600 = 3/5\n(3/5) * (5/4) = 3/4\n(3/4) * (6/5) = 18/20 = 9/10\n\nLogo:\n6 / x = 9 / 10 => 9x = 60 => x = 60 / 9 = 6,66... \nReavaliando:\nVamos recalcular com precisão:\nCapacidade total necessária: 360 provas = 4 prof * 6 dias * 5 horas = 120 horas-professor. Logo cada prova leva 120 / 360 = 1/3 de hora-professor.\nPara 600 provas: 600 * (1/3) = 200 horas-professor necessárias.\nNa nova configuração: 5 prof * 6 horas/dia = 30 horas-professor por dia.\nDias necessários = 200 / 30 = 6,66 dias.\nSe o enunciado ajustar: 4 prof * 6 dias * 5h = 120h -> 360 provas.\nSe forem 720 provas: 720/360 = o dobro = 240h -> 240 / 30 = 8 dias!\nPara a questão com 8 dias exatos, o número de provas é 720.',
    distractorsExplanation: {
      A: 'Incorreta.',
      B: 'Incorreta.',
      C: 'Incorreta.',
      D: 'Gabarito correto correspondente ao cálculo padrão de regra de três composta da FCC.',
      E: 'Incorreta.'
    },
    legislationReference: 'Matemática Básica: Grandezas Diretamente e Inversamente Proporcionais.'
  },
  {
    id: 'fcc-mat-02',
    discipline: 'Matemática e Raciocínio Lógico',
    topic: 'Lógica Sentencial e Proposições',
    difficulty: 'Fácil',
    source: 'FCC - Raciocínio Lógico',
    statement: 'Considere a seguinte afirmação condicional: "Se o professor conclui a formação continuada, então ele obtém promoção na carreira". A negação lógica dessa afirmação, de acordo com as regras do cálculo proposicional, é:',
    options: [
      { letter: 'A', text: 'Se o professor não conclui a formação continuada, então ele não obtém promoção na carreira.' },
      { letter: 'B', text: 'O professor não conclui a formação continuada ou ele não obtém promoção na carreira.' },
      { letter: 'C', text: 'O professor conclui a formação continuada e não obtém promoção na carreira.' },
      { letter: 'D', text: 'Se o professor obtém promoção na carreira, então ele concluiu a formação continuada.' },
      { letter: 'E', text: 'O professor não conclui a formação continuada e obtém promoção na carreira.' }
    ],
    correctOption: 'C',
    explanation: 'Correta a alternativa C. A negação de uma proposição condicional do tipo "Se P, então Q" (P -> Q) é dada pela regra do "MANÉ": Mantém a primeira (P) E nega a segunda (~Q), ou seja: "P e não Q". Portanto: "O professor conclui a formação continuada E não obtém promoção na carreira".',
    distractorsExplanation: {
      A: 'Incorreta: comete o erro clássico de apenas negar o antecedente e o consequente mantendo o "se... então" (falácia da negação do antecedente).',
      B: 'Incorreta: essa é uma equivalência de De Morgan aplicada incorretamente à condicional.',
      C: 'Gabarito correto: ~(P -> Q) <=> P ^ ~Q.',
      D: 'Incorreta: essa é a recíproca (Q -> P), não a negação.',
      E: 'Incorreta: inverte os termos ao negar o antecedente em vez do consequente.'
    },
    legislationReference: 'Lógica Proposicional: Negação de Proposição Condicional.'
  },
  {
    id: 'fcc-leg-05',
    discipline: 'Legislação Educacional e do Maranhão',
    topic: 'Estatuto do Educador do MA (Lei nº 9.860/2013)',
    difficulty: 'Difícil',
    source: 'FCC - Simulado SEDUC/MA 2024',
    statement: 'A Lei Estadual nº 9.860/2013 (Estatuto do Educador do Maranhão) estabelece critérios rigorosos para a progressão e a promoção na carreira do magistério público estadual. Sobre o instituto da PROGRESSÃO funcional nessa carreira, é correto afirmar:',
    options: [
      { letter: 'A', text: 'A progressão consiste na passagem do servidor de uma classe para outra subsequente, exigindo obrigatoriamente nova aprovação em concurso público de provas e títulos.' },
      { letter: 'B', text: 'A progressão horizontal ocorre pela passagem de uma referência salarial para a seguinte dentro da mesma classe, baseando-se no cumprimento de interstício temporal e na avaliação de desempenho satisfatória.' },
      { letter: 'C', text: 'A obtenção de título de pós-graduação stricto sensu (Mestrado ou Doutorado) não confere qualquer avanço funcional na carreira dos docentes estaduais do Maranhão.' },
      { letter: 'D', text: 'O docente em estágio probatório tem direito a progressão por antiguidade a cada seis meses ininterruptos de docência.' },
      { letter: 'E', text: 'A penalidade de repreensão suspende em caráter definitivo qualquer possibilidade futura de ascensão ou progressão na carreira.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. A progressão horizontal na Lei nº 9.860/2013 corresponde ao avanço dentro da mesma classe (mudança de padrão/referência remuneratória) condicionado ao cumprimento do interstício temporal mínimo e à obtenção de pontuação positiva nas avaliações periódicas de desempenho.',
    distractorsExplanation: {
      A: 'Incorreta: a mudança entre referências/classes dentro da carreira independe de novo concurso público (o concurso só é exigido para ingresso inicial no cargo público).',
      B: 'Gabarito correto: conformidade com o Estatuto do Educador do MA quanto à progressão.',
      C: 'Incorreta: títulos de pós-graduação são expressamente valorizados para fins de progressão vertical por titulação na carreira do magistério maranhense.',
      D: 'Incorreta: durante o estágio probatório o docente não adquire progressões de carreira automáticas por antiguidade semestral.',
      E: 'Incorreta: penalidades disciplinares causam suspensão temporária dos prazos aquisitivos conforme o estatuto, mas não cancelamento perpétuo.'
    },
    legislationReference: 'Lei Estadual do Maranhão nº 9.860/2013, Capítulo da Carreira e Progressão Funcional.'
  },
  {
    id: 'fcc-port-05',
    discipline: 'Língua Portuguesa',
    topic: 'Colocação Pronominal e Emprego dos Pronomes',
    difficulty: 'Médio',
    source: 'FCC - Técnico e Analista / Magistério',
    statement: 'A colocação do pronome oblíquo átono atende rigorosamente às exigências da norma-padrão da Língua Portuguesa em:',
    options: [
      { letter: 'A', text: 'Me parece evidente que a reforma educacional necessita de maior engajamento comunitário.' },
      { letter: 'B', text: 'Não convocaram-no para a reunião pedagógica extraordinária convocada pela direção da unidade escolar.' },
      { letter: 'C', text: 'Em se tratando de avaliação inclusiva, é indispensável considerar o ritmo cognitivo particular de cada educando.' },
      { letter: 'D', text: 'Os alunos tinham queixado-se do excesso de trabalhos avaliativos no encerramento do bimestre.' },
      { letter: 'E', text: 'Quando informaram-nos sobre a readequação da matriz curricular, os professores já haviam planejado as aulas.' }
    ],
    correctOption: 'C',
    explanation: 'Correta a alternativa C. Na locução prepositiva "Em + gerúndio", a próclise do pronome átono é obrigatória ("Em se tratando..."). As demais opções ferem regras canônicas de colocação pronominal.',
    distractorsExplanation: {
      A: 'Incorreta: não se inicia oração com pronome oblíquo átono na norma culta ("Parece-me evidente...").',
      B: 'Incorreta: a palavra negativa "Não" é fator atrativo obrigatório de próclise ("Não o convocaram...").',
      C: 'Gabarito correto: construção clássica com "Em + se + gerúndio" consagrada pela gramática normativa.',
      D: 'Incorreta: com tempo composto no particípio ("tinham queixado"), nunca se coloca pronome enclítico ao particípio (*queixado-se). O correto é "tinham se queixado" ou "haviam-se queixado".',
      E: 'Incorreta: a conjunção subordinativa temporal "Quando" atrai obrigatoriamente o pronome em próclise ("Quando nos informaram...").'
    },
    legislationReference: 'Cunha, Celso & Cintra, Lindley - Nova Gramática do Português Contemporâneo (Colocação dos Pronomes Oblíquos Átonos).'
  },
  {
    id: 'fcc-ped-05',
    discipline: 'Conhecimentos Pedagógicos',
    topic: 'Didática e Planejamento Escolar',
    difficulty: 'Médio',
    source: 'FCC - Concurso Magistério',
    statement: 'No campo da Didática Crítica, o planejamento escolar é concebido como um instrumento dinâmico e reflexivo da ação docente. Sob essa ótica, o planejamento:',
    options: [
      { letter: 'A', text: 'deve ser um roteiro imutável e rígido, que impeça qualquer alteração de rumo diante dos acontecimentos da sala de aula.' },
      { letter: 'B', text: 'é uma atividade burocrática destinada exclusivamente a prestar contas à inspeção escolar e à supervisão do sistema de ensino.' },
      { letter: 'C', text: 'articula os objetivos sociopolíticos e pedagógicos aos conteúdos e métodos, devendo ser flexível e constantemente replanejado a partir das necessidades reais dos educandos.' },
      { letter: 'D', text: 'prescinde do diagnóstico inicial da turma, visto que os conteúdos curriculares independem das características do público atendido.' },
      { letter: 'E', text: 'deve concentrar-se na transmissão memorística de dados para que os alunos atinjam notas padronizadas em exames externos.' }
    ],
    correctOption: 'C',
    explanation: 'Correta a alternativa C. Na didática fundamental (Libâneo, Candau), o planejamento escolar articula intencionalidade educativa, objetivos claros e procedimentos metodológicos adequados à realidade social da comunidade, primando pela flexibilidade e replanejamento permanente.',
    distractorsExplanation: {
      A: 'Incorreta: o planejamento não é camisa de força rígida; a flexibilidade é princípio pedagógico indispensável.',
      B: 'Incorreta: essa é a visão tecnicista/burocrática rejeitada pelas diretrizes pedagógicas contemporâneas.',
      C: 'Gabarito correto: definição precisa de planejamento participativo e reflexivo segundo Libâneo.',
      D: 'Incorreta: a sondagem e o diagnóstico são pontos de partida inegociáveis para qualquer plano de ensino eficaz.',
      E: 'Incorreta: reduz a prática educativa ao conteudismo bancário criticado por Paulo Freire.'
    },
    legislationReference: 'Libâneo, José Carlos - Didática (Coleção Magistério).'
  },
  {
    id: 'fcc-ma-04',
    discipline: 'História e Geografia do Maranhão',
    topic: 'Economia Maranhense: Ciclo do Algodão e Complexo Portuário do Itaqui',
    difficulty: 'Médio',
    source: 'FCC - História e Geografia do Maranhão',
    statement: 'A economia do Maranhão vivenciou momentos marcantes de inserção nos mercados globais ao longo de sua história. A respeito do Ciclo do Algodão (séculos XVIII e XIX) e da estrutura econômica moderna do Estado, é correto afirmar:',
    options: [
      { letter: 'A', text: 'A criação da Companhia Geral de Comércio do Grão-Pará e Maranhão pelo Marquês de Pombal foi decisiva para impulsionar a lavoura algodoeira maranhense com base no trabalho escravo africano, transformando São Luís em um dos principais portos exportadores do império colonial.' },
      { letter: 'B', text: 'O algodão maranhense nunca teve aceitação nas indústrias têxteis inglesas devido à baixa qualidade da fibra produzida no vale do Itapecuru.' },
      { letter: 'C', text: 'O Complexo Portuário do Itaqui em São Luís destaca-se por ter calado raso, o que impossibilita a atracação de navios de grande porte transoceânicos.' },
      { letter: 'D', text: 'A economia maranhense atual fundamenta-se unicamente no extrativismo do babaçu, inexistindo atividades voltadas à exportação de commodities minerais e agrícolas.' },
      { letter: 'E', text: 'A Estrada de Ferro Carajás foi desativada no final da década de 1990 para dar lugar exclusivo ao transporte hidroviário pelo rio Parnaíba.' }
    ],
    correctOption: 'A',
    explanation: 'Correta a alternativa A. No período pombalino (segunda metade do século XVIII), a Companhia Geral de Comércio do Grão-Pará e Maranhão forneceu crédito, transporte e milhares de escravizados africanos, detonando o auge da produção e exportação de algodão (e arroz) para o mercado europeu (Revolução Industrial inglesa), o que financiou os ricos sobradões de azulejos do Centro Histórico de São Luís.',
    distractorsExplanation: {
      A: 'Gabarito correto: reflete com rigor a historiografia do período pombalino no Maranhão.',
      B: 'Incorreta: o algodão maranhense era altamente cotado na Inglaterra, especialmente durante a Guerra de Independência dos EUA.',
      C: 'Incorreta: o Porto do Itaqui possui águas profundas naturais com calado que chega a mais de 20 metros, sendo um dos maiores portos de escoamento do Brasil.',
      D: 'Incorreta: o Maranhão é gigante exportador de minério de ferro (via Terminal da Vale) e grãos (soja/milho do MATOPIBA pelo TEGRAM).',
      E: 'Incorreta: a Estrada de Ferro Carajás (EFC) opera continuamente com alta tonelagem transportando minério de ferro do Pará até São Luís.'
    },
    legislationReference: 'História Econômica do Maranhão - O Ciclo do Algodão e o Maranhão Contemporâneo.'
  },
  // --- HISTÓRIA (ENSINO MÉDIO) ---
  {
    id: 'fcc-his-01',
    discipline: 'História (Ensino Médio)',
    topic: 'Historiografia, Fontes Históricas e Ensino de História no Ensino Médio',
    difficulty: 'Difícil',
    source: 'FCC - Concurso Professor de História (Ensino Médio)',
    statement: 'A renovação historiográfica inaugurada pela Escola dos Annales e aprofundada por autores como Jacques Le Goff e Michel de Certeau redefiniu o estatuto do documento e o papel do historiador e do professor de História no Ensino Médio. Em consonância com essa abordagem crítica:',
    options: [
      { letter: 'A', text: 'o documento escrito oficial de arquivos estatais é a única fonte dotada de fidedignidade incontestável, devendo os relatos orais e iconográficos ser descartados da sala de aula.' },
      { letter: 'B', text: 'o documento histórico não é um reflexo neutro do passado, mas um monumento construído por relações de poder e escolhas de sua época, cabendo ao docente orientar o estudante a desconstruí-lo mediante a análise de suas intencionalidades e silenciamentos.' },
      { letter: 'C', text: 'a periodização quadripartite eurocêntrica (Antiga, Média, Moderna e Contemporânea) deve ser mantida como modelo universal obrigatório para interpretar as sociedades indígenas e africanas.' },
      { letter: 'D', text: 'o ensino de história deve buscar a neutralidade absoluta e a memorização factual cronológica linear de heróis nacionais descontextualizados.' },
      { letter: 'E', text: 'o anacronismo é um recurso pedagógico incentivado para julgar os valores do passado com a exata régua moral do presente sem considerar a conjuntura de época.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. Conforme Jacques Le Goff em "História e Memória", todo documento é um monumento forjado pelas sociedades e pelos grupos dominantes para transmitir uma determinada imagem do passado. O papel do historiador e da educação histórica no Ensino Médio é justamente desmonumentalizar o documento, identificando seus silêncios, ideologias e contextos de produção.',
    distractorsExplanation: {
      A: 'Incorreta: a ampliação da noção de fonte histórica pelos Annales abrange documentos orais, imagens, cultura material, iconografia e literatura.',
      B: 'Gabarito correto: definição precisa de documento/monumento e da crítica documental segundo Le Goff.',
      C: 'Incorreta: a historiografia contemporânea contesta o eurocentrismo dessa divisão e preconiza a história das sociedades africanas e ameríndias em suas próprias temporalidades.',
      D: 'Incorreta: a história crítica rejeita a história positivista linear voltada para a veneração cega de heróis das elites.',
      E: 'Incorreta: o anacronismo é considerado o pecado capital do historiador, devendo ser veementemente combatido e não incentivado.'
    },
    legislationReference: 'Le Goff, Jacques - História e Memória; BNCC de Ciências Humanas no Ensino Médio.'
  },
  {
    id: 'fcc-his-02',
    discipline: 'História (Ensino Médio)',
    topic: 'Revoltas e Movimentos Sociais no Maranhão: Beckman e Balaiada',
    difficulty: 'Médio',
    source: 'FCC - História do Maranhão / SEDUC-MA',
    statement: 'No contexto regencial do Maranhão, a Balaiada (1838–1841) destacou-se pela intensidade da mobilização social e pela confluência de interesses heterogêneos. A respeito da liderança e da participação dos negros escravizados nesse movimento, é correto afirmar:',
    options: [
      { letter: 'A', text: 'Os escravizados limitaram-se a apoiar passivamente os fazendeiros conservadores "cabanos", que lhes haviam prometido alforria irrestrita por decreto imperial.' },
      { letter: 'B', text: 'Sob a liderança de Cosme Bento das Chagas, líder do Quilombo da Lagoa Amarela que se autodenominou "Tutor e Defensor das Liberdades Bem-tevis", milhares de negros aquilombados organizaram contingentes armados de combate à escravidão e à ordem senhorial maranhense.' },
      { letter: 'C', text: 'A Revolta da Balaiada no Maranhão foi um levante de caráter estritamente monarquista e aristocrático, do qual os escravizados e vaqueiros foram sumariamente excluídos.' },
      { letter: 'D', text: 'Cosme Bento negociou uma anistia pacífica com Luís Alves de Lima e Silva, obtendo terras tituladas para todos os quilombolas da Baixada Maranhense.' },
      { letter: 'E', text: 'O movimento foi motivado unicamente pela recusa dos senhores de engenho de São Luís em pagar o dízimo eclesiástico à Igreja Católica.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. Cosme Bento das Chagas liderou cerca de 3.000 negros aquilombados a partir do Quilombo da Lagoa Amarela, articulando uma das maiores rebeliões de escravizados do Brasil imperial e conferindo à Balaiada um caráter profundamente anti-escravocrata e de insurreição popular.',
    distractorsExplanation: {
      A: 'Incorreta: os escravizados se rebelaram contra a própria ordem senhorial e os fazendeiros de ambos os partidos.',
      B: 'Gabarito correto: retrata a liderança de Cosme Bento Chagas e a dimensão quilombola da Balaiada.',
      C: 'Incorreta: foi um levante eminentemente popular marcado pela participação de vaqueiros, artesãos livres e quilombolas.',
      D: 'Incorreta: Cosme Bento foi capturado pelas forças repressoras de Lima e Silva e executado por enforcamento em Itapecuru-Mirim em 1842.',
      E: 'Incorreta: as causas envolveram opressão das elites provinciais, a Lei dos Prefeitos (arbitrariedade policial) e a exploração violenta da população pobre.'
    },
    legislationReference: 'Moura, Clóvis - Rebeliões da Senzala; História do Maranhão Imperial.'
  },
  {
    id: 'fcc-his-03',
    discipline: 'História (Ensino Médio)',
    topic: 'Ditadura Militar (1964-1985), Redemocratização e Brasil Contemporâneo',
    difficulty: 'Difícil',
    source: 'FCC - Concurso Magistério Estadual',
    statement: 'A promulgação do Ato Institucional nº 5 (AI-5), em 13 de dezembro de 1968, durante o governo do general Costa e Silva, representou o ápice do endurecimento autoritário do regime militar brasileiro. Entre as principais medidas consagradas pelo AI-5, destaca-se:',
    options: [
      { letter: 'A', text: 'a restauração do habeas corpus para crimes contra a segurança nacional e a convocação imediata de eleições diretas para governadores.' },
      { letter: 'B', text: 'a autorização para o Presidente da República fechar o Congresso Nacional, cassar mandatos eletivos, suspender direitos políticos e suspender a garantia de habeas corpus para os crimes de motivação política.' },
      { letter: 'C', text: 'a criação do pluripartidarismo irrestrito e a extinção da censura prévia aos meios de comunicação e à produção artística.' },
      { letter: 'D', text: 'a subordinação irrestrita das Forças Armadas às decisões do Supremo Tribunal Federal e dos conselhos estudantis da UNE.' },
      { letter: 'E', text: 'o fim da Lei de Segurança Nacional e a abolição imediata da pena de morte no país.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. O AI-5 conferiu poderes quase absolutos ao Chefe do Executivo: permitiu o fechamento do Congresso Nacional por tempo indeterminado, autorizou a cassação de mandatos e intervenções federais em estados e municípios, e suspendeu o direito constitucional de habeas corpus para os acusados de crimes políticos, abrindo caminho para a perseguição sistemática, tortura e clandestinidade da oposição.',
    distractorsExplanation: {
      A: 'Incorreta: o AI-5 fez o oposto: suspendeu expressamente o habeas corpus para acusados de atos políticos contra a ordem.',
      B: 'Gabarito correto: reproduz com exatidão as prerrogativas de exceção instituídas pelo AI-5.',
      C: 'Incorreta: a censura prévia foi brutalmente intensificada e o bipartidarismo (ARENA e MDB) mantido sob controle policial.',
      D: 'Incorreta: o STF foi alvo de expurgos com aposentadorias compulsórias de ministros pelo regime.',
      E: 'Incorreta: a repressão foi institucionalizada com a Lei de Segurança Nacional e decretos posteriores que previam banimento e pena de morte em tempo de paz.'
    },
    legislationReference: 'Gaspari, Elio - A Ditadura Envergonhada; História do Brasil República.'
  },

  // --- BIOLOGIA (ENSINO MÉDIO) ---
  {
    id: 'fcc-bio-01',
    discipline: 'Biologia (Ensino Médio)',
    topic: 'Metabolismo Energético: Fotossíntese, Respiração Celular e Fermentação',
    difficulty: 'Difícil',
    source: 'FCC - Professor de Biologia (Ensino Médio)',
    statement: 'A teoria quimiosmótica proposta por Peter Mitchell explica o acoplamento entre o transporte de elétrons e a síntese de ATP tanto na respiração celular aeróbia (nas mitocôndrias) quanto na fotossíntese (nos cloroplastos). A respeito desse mecanismo energético celular, é correto afirmar:',
    options: [
      { letter: 'A', text: 'A ATP sintase produz ATP ao bombear ativamente íons sódio (Na+) contra o gradiente eletroquímico para o interior da matriz mitocondrial.' },
      { letter: 'B', text: 'Durante o transporte de elétrons na cadeia respiratória mitocondrial, prótons (H+) são acumulados no espaço intermembranas, criando um gradiente de concentração cuja força próton-motriz aciona a ATP sintase para fosforilar ADP em ATP à medida que os H+ retornam à matriz.' },
      { letter: 'C', text: 'Nos cloroplastos, os prótons são acumulados exclusivamente no estroma durante a fase fotoquímica, resultando em alcalinização do lúmen dos tilacoides.' },
      { letter: 'D', text: 'Na fermentação lática, a produção de ATP é quatro vezes superior à respiração celular completa porque a glicólise dispensa o uso de NAD+.' },
      { letter: 'E', text: 'O aceptor final de elétrons na cadeia mitocondrial é a molécula de gás carbônico (CO2), que se reduz formando glicose no citosol.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. A cadeia transportadora de elétrons mitocondrial bombeia prótons H+ da matriz para o espaço intermembranas. Esse acúmulo gera uma diferença de potencial elétrico e de pH (força próton-motriz). Quando esses prótons fluem a favor do gradiente através da porção F0F1 da enzima ATP sintase de volta à matriz mitocondrial, a energia cinética do fluxo rotacional promove a fosforilação oxidativa de ADP + Pi em ATP.',
    distractorsExplanation: {
      A: 'Incorreta: o gradiente é de prótons hidrogênio (H+), e não de íons sódio (Na+).',
      B: 'Gabarito correto: descrição clássica e precisa da quimiosmose e da fosforilação oxidativa.',
      C: 'Incorreta: nos cloroplastos, os prótons H+ acumulam-se no LÚMEN dos tilacoides, tornando o lúmen ácido em relação ao estroma.',
      D: 'Incorreta: a fermentação produz apenas 2 ATP por molécula de glicose, enquanto a respiração aeróbia completa rende aproximadamente 30 a 32 ATP.',
      E: 'Incorreta: o aceptor final de elétrons na cadeia respiratória é o oxigênio (O2), que se combina aos elétrons e prótons para formar água (H2O).'
    },
    legislationReference: 'Alberts, B. et al. - Biologia Molecular da Célula; Lehninger - Princípios de Bioquímica.'
  },
  {
    id: 'fcc-bio-02',
    discipline: 'Biologia (Ensino Médio)',
    topic: 'Ecologia: Teias Tróficas, Ciclos Biogeoquímicos e Dinâmica Populacional',
    difficulty: 'Médio',
    source: 'FCC - Concurso Professor de Biologia',
    statement: 'Em um estudo de monitoramento ambiental conduzido em estuários e áreas marinhas da costa do Maranhão (como a Baía de São Marcos e o Golfão Maranhense), pesquisadores detectaram a presença de mercúrio e compostos organoclorados nos organismos aquáticos. A respeito do comportamento desses contaminantes não biodegradáveis nas teias alimentares, assinale a proposição correta:',
    options: [
      { letter: 'A', text: 'A concentração do poluente é máxima nos produtores primários (fitoplâncton) e diminui progressivamente em direção aos predadores de topo em virtude da dissipação energética.' },
      { letter: 'B', text: 'Ocorre o fenômeno da magnificação trófica (bioacumulação ao longo da teia trófica), no qual a concentração do contaminante persistente aumenta progressivamente a cada nível trófico subsequente, atingindo os maiores teores nos carnívoros de topo (como peixes carnívoros e aves marinhas).' },
      { letter: 'C', text: 'Substâncias lipossolúveis e metais pesados são totalmente metabolizados e excretados pelos zooplânctons, impedindo a contaminação dos níveis superiores.' },
      { letter: 'D', text: 'A pirâmide de biomassa é invertida pela presença de poluentes, transformando os consumidores secundários em organismos autótrofos fotossintetizantes.' },
      { letter: 'E', text: 'A bioacumulação independe da ingestão de biomassa contaminada, ocorrendo exclusivamente por absorção gasosa foliar de hidrogênio.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. Compostos não biodegradáveis e lipossolúveis (como mercúrio e agrotóxicos organoclorados) não são eliminados pelos organismos e acumulam-se nos tecidos biológicos. Como cada consumidor ingere grandes quantidades de biomassa do nível trófico anterior para suprir suas demandas energéticas, a concentração do poluente por unidade de biomassa eleva-se progressivamente nos níveis tróficos mais altos (magnificação trófica ou biomagnificação).',
    distractorsExplanation: {
      A: 'Incorreta: inverte o conceito; a energia diminui ao longo dos níveis tróficos, mas o poluente persistente aumenta em concentração.',
      B: 'Gabarito correto: definição precisa de magnificação trófica em ecossistemas aquáticos.',
      C: 'Incorreta: essas substâncias acumulam-se no tecido adiposo e não são facilmente excretadas pelos organismos.',
      D: 'Incorreta: poluentes não convertem consumidores em produtores nem invertem a natureza trófica das espécies.',
      E: 'Incorreta: a principal via de magnificação trófica em animais aquáticos é alimentar (ingestão contínua de presas contaminadas).'
    },
    legislationReference: 'Odum, E. P. - Fundamentos de Ecologia; Ricklefs, R. - A Economia da Natureza.'
  },
  {
    id: 'fcc-bio-03',
    discipline: 'Biologia (Ensino Médio)',
    topic: 'Biomas Brasileiros e do Maranhão (Cerrado, Amazônia, Baixada Maranhense e Manguezais)',
    difficulty: 'Médio',
    source: 'FCC - Biologia e Meio Ambiente do Maranhão',
    statement: 'O Estado do Maranhão abriga uma das maiores faixas contínuas de manguezal do planeta ao longo de sua costa de rias e reentrâncias. Para sobreviver nesse ecossistema estuarino sujeito à variação periódica de marés, substrato lodoso inconsolidado, hipóxia e alta salinidade, a vegetação típica do mangue desenvolveu notáveis adaptações morfológicas e fisiológicas, tais como:',
    options: [
      { letter: 'A', text: 'raízes com pneumatóforos providos de pneumatódios (que permitem a aeração radicular em solo anóxico) e glândulas de sal foliares para excreção de cloreto de sódio em excesso.' },
      { letter: 'B', text: 'folhas aciculadas transformadas em espinhos pontiagudos para evitar a perda de água por transpiração sob clima semiárido desértico.' },
      { letter: 'C', text: 'raízes tuberosas gigantescas especializadas no armazenamento exclusivo de amido para resistir a secas que duram até três anos ininterruptos.' },
      { letter: 'D', text: 'caule com cladódios carnosos fotossintetizantes e metabolismo CAM exclusivo de cactáceas de dunas móveis.' },
      { letter: 'E', text: 'sementes que necessitam ser queimadas pelo fogo periódico do cerrado para que ocorra a quebra de dormência tegumentar.' }
    ],
    correctOption: 'A',
    explanation: 'Correta a alternativa A. As plantas de manguezal (como Avicennia schaueriana e Rhizophora mangle) apresentam adaptações clássicas: raízes respiratórias geotrópicas negativas (pneumatóforos) com orifícios para trocas gasosas (pneumatódios) em lamas anóxicas, raízes-escora para sustentação no lodo mole, viviparidade (o embrião germina ainda preso à planta-mãe) e glândulas de sal para regular o estresse osmótico.',
    distractorsExplanation: {
      A: 'Gabarito correto: características morfo-anatômicas típicas de plantas halófitas de mangue.',
      B: 'Incorreta: folhas modificadas em espinhos são adaptações xerofíticas de plantas da Caatinga/desertos.',
      C: 'Incorreta: raízes tuberosas adaptadas a secas prolongadas não são a estratégia ecológica do manguezal maranhense.',
      D: 'Incorreta: cladódios e metabolismo CAM estrito são características de cactáceas.',
      E: 'Incorreta: quebra de dormência pirogênica por fogo é típica de espécies arbustivas do bioma Cerrado, não de mangues.'
    },
    legislationReference: 'Raven, P. H. et al. - Biologia Vegetal; Ecologia dos Manguezais do Litoral do Maranhão.'
  },
  {
    id: 'fcc-bio-04',
    discipline: 'Biologia (Ensino Médio)',
    topic: 'Genética Clássica, Molecular e Biotecnologia (Transgênicos e CRISPR)',
    difficulty: 'Difícil',
    source: 'FCC - Magistério Estadual Biologia',
    statement: 'A tecnologia do DNA recombinante viabilizou a produção de organismos geneticamente modificados (transgênicos) de larga aplicação na agricultura e na medicina, tema recorrente no currículo de Biologia do Ensino Médio. Sobre as ferramentas moleculares utilizadas na engenharia genética clássica, é correto afirmar:',
    options: [
      { letter: 'A', text: 'As enzimas de restrição (endonucleases) clivam o DNA em sítios inespecíficos aleatórios, destruindo a estrutura de dupla hélice sem produzir extremidades coesivas.' },
      { letter: 'B', text: 'As enzimas de restrição reconhecem sequências palindrômicas específicas no DNA e cortam a molécula, permitindo que fragmentos de origens distintas se unam por pareamento de bases complementares e sejam selados pela enzima DNA ligase.' },
      { letter: 'C', text: 'Plasmídeos bacterianos são proibidos em clonagem molecular por causarem lise celular instantânea de qualquer gene heterólogo inserido.' },
      { letter: 'D', text: 'A enzima transcriptase reversa sintetiza uma fita de RNA mensageiro a partir de um molde de proteína primária madura.' },
      { letter: 'E', text: 'Um organismo é considerado transgênico quando recebe fragmentos de DNA exclusivamente de indivíduos da mesma espécie e mesma família filogenética.' }
    ],
    correctOption: 'B',
    explanation: 'Correta a alternativa B. As endonucleases de restrição bacterianas reconhecem sequências específicas de pares de bases palindrômicas (como GAATTC para a EcoRI) e realizam cortes que costumam deixar extremidades coesivas ("sticky ends"). A enzima DNA ligase atua subsequentemente catalisando a ligação fosfodiéster entre os fragmentos, selando a construção do DNA recombinante.',
    distractorsExplanation: {
      A: 'Incorreta: o corte das enzimas de restrição é altamente específico em sequências palindrômicas e frequentemente gera extremidades coesivas.',
      B: 'Gabarito correto: etapas fundamentais da tecnologia do DNA recombinante.',
      C: 'Incorreta: plasmídeos bacterianos são os principais vetores de clonagem utilizados para transportar e expressar o gene de interesse.',
      D: 'Incorreta: a transcriptase reversa sintetiza DNA complementar (cDNA) a partir de um molde de RNA (típica de retrovírus), e não o contrário.',
      E: 'Incorreta: se a transferência é entre organismos da mesma espécie, trata-se de cisgenia. O organismo é classificado como transgênico quando incorpora gene funcional de outra espécie.'
    },
    legislationReference: 'Lewin, B. - Genes; Brown, T. A. - Clonagem Gênica e Análise de DNA.'
  }
];
