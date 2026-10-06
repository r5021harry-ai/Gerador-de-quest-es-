import streamlit as st
from google import genai

# ---------------------------------------------------------
# CONFIGURAÇÃO DA PÁGINA
# ---------------------------------------------------------
st.set_page_config(
    page_title="SimulaFCC • SEDUC-MA",
    page_icon="🎓",
    layout="wide"
)

# ---------------------------------------------------------
# GERENCIAMENTO DA CHAVE API (Pede apenas uma vez)
# ---------------------------------------------------------
if "api_key" not in st.session_state:
    st.session_state.api_key = ""

with st.sidebar:
    st.title("⚙️ Configurações")
    key_input = st.text_input(
        "Cole sua Gemini API Key:", 
        value=st.session_state.api_key, 
        type="password",
        help="A chave fica salva durante o uso da sessão."
    )
    if key_input:
        st.session_state.api_key = key_input
        st.success("API Key guardada com sucesso!")

# ---------------------------------------------------------
# ESTILIZAÇÃO CSS CUSTOMIZADA (Tema SimulaFCC - Imagem 2)
# ---------------------------------------------------------
st.markdown("""
<style>
    /* Fundo Escuro do App */
    .stApp {
        background-color: #0b0f19;
        color: #e2e8f0;
    }
    
    .badge-tag {
        background-color: #854d0e;
        color: #fef08a;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: bold;
    }

    /* Card do Plano de Reforço */
    .reforco-card {
        background: linear-gradient(90deg, #31131d 0%, #17132a 100%);
        border: 1px solid #9f1239;
        border-radius: 10px;
        padding: 18px 24px;
        margin-bottom: 25px;
    }

    /* Botões do Menu Superior */
    div.stButton > button {
        border-radius: 8px;
        border: 1px solid #334155;
        background-color: #1e293b;
        color: #f8fafc;
        font-weight: 500;
    }
    
    div.stButton > button:hover {
        border-color: #6366f1;
        color: #818cf8;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# TOPO DO APP E ESTATÍSTICAS
# ---------------------------------------------------------
top_col1, top_col2 = st.columns([2, 1])

with top_col1:
    st.markdown("## 🎓 **SimulaFCC** <span class='badge-tag'>SEDUC-MA • Ensino Médio</span>", unsafe_allow_html=True)
    st.caption("Magistério Ensino Médio: História & Biologia • Fundação Carlos Chagas")

with top_col2:
    s1, s2, s3 = st.columns(3)
    s1.metric("Respondidas", "5")
    s2.metric("Aproveitamento", "40%")
    s3.metric("Ofensiva", "🔥 1 dia")

# Menu de Navegação Superior
nav_1, nav_2, nav_3, nav_4, nav_5, nav_6 = st.columns(6)
nav_1.button("➕ Novo Simulado", type="primary", use_container_width=True)
nav_2.button("🔄 Reforço (3)", use_container_width=True)
nav_3.button("📖 Caderno de Erros", use_container_width=True)
nav_4.button("📈 Estatísticas", use_container_width=True)
nav_5.button("📜 Histórico", use_container_width=True)
nav_6.button("📄 Edital Base", use_container_width=True)

st.write("")

# ---------------------------------------------------------
# BANNER DO PLANO DE REFORÇO ATIVO
# ---------------------------------------------------------
st.markdown("""
<div class="reforco-card">
    <div>
        <h4 style="margin: 0; color: #fecdd3;">🎯 Plano de Reforço Ativo: 3 questão(ões) no Caderno de Erros</h4>
        <p style="margin: 4px 0 0 0; color: #fda4af; font-size: 13px;">Aumente sua retenção realizando um simulado focado especificamente nos conteúdos que você mais errou.</p>
    </div>
</div>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# PAINEL DE CONFIGURAÇÃO DO SIMULADO
# ---------------------------------------------------------
st.markdown("### ⚙️ Configurar Simulado FCC • SEDUC-MA")
st.caption("Personalize disciplina, profundidade e modo de treino da banca")

st.write("")

# Área do Cargo
st.write("**Área do Cargo (Ensino Médio):**")
foco_cargo = st.radio(
    "Cargo", 
    ["Geral / Combinado", "Foco: Professor de História", "Foco: Professor de Biologia"],
    horizontal=True,
    label_visibility="collapsed"
)

st.write("")

# 1. DISCIPLINA DO EDITAL
st.write("**1. DISCIPLINA DO EDITAL**")
col_d1, col_d2, col_d3 = st.columns(3)

with col_d1:
    st.checkbox("Todas as Disciplinas (Simulação Mista)", value=True)
    st.checkbox("Legislação Educacional e do Maranhão")

with col_d2:
    st.checkbox("História (Ensino Médio)")
    st.checkbox("Conhecimentos Pedagógicos e Didática")

with col_d3:
    st.checkbox("Biologia (Ensino Médio)")
    st.checkbox("Língua Portuguesa")

st.write("")

# 3 & 4. DIFICULDADE E QUANTIDADE DE QUESTÕES
col_dif, col_qtd = st.columns(2)

with col_dif:
    st.write("**3. NÍVEL DE DIFICULDADE DA FCC**")
    dificuldade = st.select_slider(
        "Nível",
        options=["Todos", "Fácil", "Médio", "Difícil"],
        value="Todos",
        label_visibility="collapsed"
    )
    st.caption("Equilíbrio real reproduzindo a composição da prova da SEDUC-MA.")

with col_qtd:
    st.write("**4. QUANTIDADE DE QUESTÕES**")
    qtd_questoes = st.select_slider(
        "Quantidade",
        options=["5 questões", "10 questões", "15 questões", "20 questões"],
        value="10 questões",
        label_visibility="collapsed"
    )
    st.caption("⏱️ Tempo recomendado FCC: ~30 minutos")

st.divider()

# ---------------------------------------------------------
# BOTÃO DE GERAR SIMULADO
# ---------------------------------------------------------
if st.button("🚀 GERAR SIMULADO AGORA", type="primary", use_container_width=True):
    if not st.session_state.api_key:
        st.error("⚠️ Insira a sua Gemini API Key no menu lateral para começar.")
    else:
        client = genai.Client(api_key=st.session_state.api_key)
        
        prompt = f"""
        Você é a banca examinadora FCC (Fundação Carlos Chagas) para o concurso SEDUC-MA.
        Gere um simulado completo com as seguintes especificações:
        - Foco do Cargo: {foco_cargo}
        - Nível de Dificuldade: {dificuldade}
        - Quantidade: {qtd_questoes}
        
        Apresente as questões com 5 alternativas (A, B, C, D, E) no estilo clássico da FCC.
        No final de cada questão, inclua o Gabarito Comentado explicativo.
        """
        
        with st.spinner("A gerar o simulado com o modelo Gemini..."):
            try:
                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=prompt,
                )
                st.markdown("### 📝 Simulado Gerado")
                st.write(response.text)
            except Exception as e:
                st.error(f"Erro ao processar o pedido: {e}")
