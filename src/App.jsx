import React, { useState } from 'react';

// --- Dados dos Cards Rápidos ---
const quickCards = [
  {
    id: 1,
    pillText: "Melhor escolha",
    pillClass: "pill-blue",
    cardClass: "card-highlighted",
    title: "ThinkPad T490",
    subtitle: "Lenovo · 10ª geração",
    cpu: "Intel Core i5-10210U",
    ram: "16 GB RAM DDR4",
    ssd: "SSD NVMe 512 GB",
    screen: "Tela 14\" Full HD IPS",
    price: "R$ 1.900 – 2.200",
    searchQuery: "Notebook Lenovo ThinkPad T490 i5 16gb 512gb",
    image: "/images/t490.png",
    details: {
      summary: "Na minha opinião, essa é a melhor máquina hoje. Ele é fino, super leve e o teclado é maravilhoso pra digitar o dia todo.",
      goodFor: ["Abrir milhões de abas sem travar", "Planilhas pesadonas no Excel", "Apresentações e uso de CRMs web", "Levar pra cima e pra baixo sem pesar"],
      badFor: ["Jogos de última geração", "Edição de vídeo em 4K"]
    }
  },
  {
    id: 2,
    pillText: "Custo-benefício",
    pillClass: "pill-green",
    cardClass: "",
    title: "ThinkPad T480",
    subtitle: "Lenovo · 8ª geração",
    cpu: "Intel Core i5-8250U",
    ram: "16 GB RAM DDR4",
    ssd: "SSD 512 GB",
    screen: "Tela 14\" Full HD",
    price: "R$ 1.500 – 1.800",
    searchQuery: "Notebook Lenovo ThinkPad T480 i5 16gb 512gb",
    image: "/images/t480.png",
    details: {
      summary: "Esse é o famoso 'tanque de guerra'. É uma máquina bruta, que dura a vida inteira e se um dia der defeito, é super barato de arrumar.",
      goodFor: ["Trabalhos longos de digitação", "Bater de um lado pro outro", "Economizar uma grana no conserto"],
      badFor: ["Jogos pesados", "Quem liga muito pra estética (ele é mais rústico)"]
    }
  },
  {
    id: 3,
    pillText: "Tela e peso",
    pillClass: "pill-light-blue",
    cardClass: "",
    title: "EliteBook 840 G6",
    subtitle: "HP · 8ª–10ª geração",
    cpu: "Intel Core i5-8365U",
    ram: "16 GB RAM DDR4",
    ssd: "SSD 512 GB",
    screen: "Tela 14\" Full HD anti-reflexo",
    price: "R$ 2.000 – 2.300",
    searchQuery: "Notebook HP EliteBook 840 G6 i5 16gb 512gb",
    image: "/images/elitebook.png",
    details: {
      summary: "Esse aqui é pra tirar onda na reunião. Tem um acabamento em alumínio que parece MacBook e a tela é sensacional pra quem fica horas no PC.",
      goodFor: ["Reuniões com clientes (Visual bem Premium)", "Longas horas de tela (Cansa menos o olho)"],
      badFor: ["Jogos pesados", "Ambientes com muita sujeira (o alumínio arranha mais que plástico)"]
    }
  },
  {
    id: 4,
    pillText: "Mais barato",
    pillClass: "pill-orange",
    cardClass: "",
    title: "Latitude 5490",
    subtitle: "Dell · 8ª geração",
    cpu: "Intel Core i5-8350U",
    ram: "16 GB RAM DDR4",
    ssd: "SSD 512 GB",
    screen: "Tela 14\" Full HD",
    price: "R$ 1.400 – 1.700",
    searchQuery: "Notebook Dell Latitude 5490 i5 16gb 512gb",
    image: "/images/latitude5490.png",
    details: {
      summary: "A escolha segura pra gastar pouco. Ele não é o mais bonito da turma, mas tem o mesmo motor (processador) dos outros e dá conta do recado tranquilo.",
      goodFor: ["Orçamentos mais apertados", "Uso do dia a dia (Word, Excel, Web)", "Deixar mais fixo na mesa"],
      badFor: ["Jogar", "Quem se importa com design fininho"]
    }
  },
  {
    id: 5,
    pillText: "Fino e leve",
    pillClass: "pill-green",
    cardClass: "",
    title: "Latitude 7390",
    subtitle: "Dell · 8ª geração",
    cpu: "Intel Core i5-8350U",
    ram: "16 GB RAM DDR4",
    ssd: "SSD 512 GB",
    screen: "Tela 13\" Full HD, chassis carbono",
    price: "R$ 1.700 – 2.000",
    searchQuery: "Notebook Dell Latitude 7390 i5 16gb 512gb",
    image: "/images/latitude7390.png",
    details: {
      summary: "O grande truque desse é o tamanho: ele é pequenininho (13 polegadas) e quase não faz peso na bolsa. Ótimo pra quem vive na rua visitando cliente.",
      goodFor: ["Levar em viagem e avião", "Andar o dia todo com ele na mochila", "Vendedores externos"],
      badFor: ["Quem precisa de tela grande pra enxergar melhor", "Ficar 100% do tempo no escritório sem ligar num monitor maior"]
    }
  }
];

// Icons
const CpuIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;
const RamIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
const DiskIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>;
const ScreenIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="17" x2="22" y2="17"></line></svg>;
const GoogleIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const InfoIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);

  const openModal = (card) => {
    setSelectedCard(card);
    document.body.style.overflow = 'hidden'; 
  };
  
  const closeModal = () => {
    setSelectedCard(null);
    document.body.style.overflow = ''; 
    setTouchStartY(null);
  };

  const handleTouchMove = (e) => {
    if (!touchStartY) return;
    const diffY = e.targetTouches[0].clientY - touchStartY;
    if (diffY > 60) { // Se arrastar 60px para baixo
      closeModal();
    }
  };

  return (
    <div className="report-container">
      <div className="report-body">
        
        <section className="intro-block" style={{marginBottom: '3rem'}}>
          <h1 style={{fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#111827'}}>
            Notebooks que Eu Recomendo pra Você
          </h1>
          <div className="context-box" style={{backgroundColor: '#f3f4f6', padding: '1.25rem', borderRadius: '10px', color: '#374151'}}>
            <p>Dei uma pesquisada nas melhores opções pensando no que você vai usar (ChatGPT, Excel, CRM, etc). Foquei em máquinas com <strong>16 GB de RAM</strong> e <strong>SSD de 512 GB</strong> pra garantir que nada vai travar nos próximos anos.</p>
          </div>
        </section>

        {/* Modelos Recomendados */}
        <section className="quick-guide-section" style={{marginBottom: '3rem'}}>
          <h2 className="section-title">O que eu compraria de olhos fechados:</h2>
          <p style={{marginBottom: '1.5rem', color: '#4b5563'}}>Essas são as melhores opções custo-benefício que achei lá na Santa Ifigênia e Mercado Livre.</p>
          
          <div className="quick-cards-grid">
            {quickCards.map((card) => (
              <div key={card.id} className={`quick-card ${card.cardClass}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div className={`quick-pill ${card.pillClass}`} style={{ marginBottom: 0 }}>{card.pillText}</div>
                  <img src={card.image} alt={card.title} className="card-mini-image" />
                </div>
                <h3 className="quick-title">{card.title}</h3>
                <p className="quick-subtitle">{card.subtitle}</p>
                
                <ul className="quick-specs">
                  <li><span className="q-icon"><CpuIcon /></span> {card.cpu}</li>
                  <li><span className="q-icon"><RamIcon /></span> {card.ram}</li>
                  <li><span className="q-icon"><DiskIcon /></span> {card.ssd}</li>
                  <li><span className="q-icon"><ScreenIcon /></span> {card.screen}</li>
                </ul>

                <div className="quick-price-block">
                  <p className="quick-price-label">preço médio seminovo</p>
                  <p className="quick-price-value">{card.price}</p>
                </div>

                {/* --- BOTÕES NOVOS --- */}
                <div className="quick-actions">
                  <button className="btn-action btn-outline" onClick={() => openModal(card)}>
                    <InfoIcon /> Detalhes
                  </button>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent(card.searchQuery)}`} target="_blank" rel="noreferrer" className="btn-action btn-primary">
                    <GoogleIcon /> Buscar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grade de Cards Auxiliares */}
        <div className="aux-cards-grid">
          <div className="aux-card avoid-card">
            <h3 className="aux-card-title danger-text">🚨 Foge desses aqui!</h3>
            <ul className="aux-list">
              <li>Qualquer coisa com <strong>Celeron</strong> ou <strong>Pentium</strong> (Fria total).</li>
              <li>Processadores Intel Core <strong>i3 muito antigos</strong>.</li>
              <li>Máquinas com só <strong>8 GB de RAM</strong> (Vai engasgar o seu CRM).</li>
              <li>Aparelhos que tenham <strong>HD mecânico</strong> no lugar de SSD (Lentidão absurda).</li>
              <li>Telas antigas HD 1366x768 (A imagem fica ruim, exija tela Full HD).</li>
            </ul>
          </div>

          <div className="aux-card tips-card">
            <h3 className="aux-card-title">💡 Fique de olho nisso</h3>
            <ul className="aux-list">
              <li>Pede foto real do teclado: se tiver muito gasto, o note foi moído de trabalhar.</li>
              <li>Olha se a saúde da bateria tá acima de 75%.</li>
              <li>Vendedor não colocou a "geração" do processador no anúncio? Pula fora.</li>
              <li>Só compre se o cara der nota fiscal e no mínimo 3 meses de garantia.</li>
            </ul>
          </div>

          <div className="aux-card search-card">
            <h3 className="aux-card-title">🔍 Buscas para Mercado Livre</h3>
            <ul className="aux-list code-list">
              <li><code>ThinkPad T490 i5 16GB 512GB Full HD</code></li>
              <li><code>Dell Latitude 5410 i5 16GB 512GB</code></li>
              <li><code>HP EliteBook 840 G6 i5 16GB 512GB</code></li>
              <li><code>ThinkPad T480 i5 16GB 512GB Full HD</code></li>
            </ul>
          </div>

          <div className="aux-card stores-card">
            <h3 className="aux-card-title">🏬 Lojas na Santa Ifigênia</h3>
            <ul className="aux-list">
              <li>Mundo do Notebook</li>
              <li>Central Point Computers</li>
              <li>Note Place</li>
              <li>Infor Waste Informática</li>
            </ul>
          </div>
        </div>

        {/* Frase para loja */}
        <section className="phrase-section" style={{marginTop: '3rem', marginBottom: '3rem'}}>
          <h2 className="section-title">O que falar pro vendedor (Pra ele não te enrolar)</h2>
          <div className="phrase-card">
            <p className="phrase-text">
              "Chega nele e fala exatamente assim: 'Tô procurando um notebook corporativo seminovo, processador i5 de 8ª geração pra cima, com 16 GB de RAM, SSD de 512 e tela Full HD. Meu teto pra gastar é uns R$ 2.500.'"
            </p>
          </div>
        </section>

        {/* Protocolo de Validação */}
        <section className="checklist-section">
          <div className="protocol-card">
            <h2 className="section-title" style={{marginBottom: '0.5rem'}}>Testes pra fazer antes de passar o cartão</h2>
            <p style={{marginBottom: '1.5rem', color: '#4b5563', fontSize: '0.95rem'}}>
              Senta lá na mesa dele e confere isso aqui rapidão pra não ter dor de cabeça depois.
            </p>
            
            <table className="gpt-table">
              <thead>
                <tr>
                  <th style={{width: '25%'}}>O que testar</th>
                  <th style={{width: '75%'}}>Como fazer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>A. Bateria</strong></td>
                  <td>Tire da tomada e observe se a carga despenca. Abra o <code>cmd</code>, digite <code>powercfg /batteryreport</code> e confira se a capacidade real está acima de 75%.</td>
                </tr>
                <tr>
                  <td><strong>B. Hardware</strong></td>
                  <td>Aperte <code>Ctrl+Shift+Esc</code>. Em "Desempenho", confirme se tem 16GB de RAM e se o CPU é i5 de 8ª geração ou superior.</td>
                </tr>
                <tr>
                  <td><strong>C. Teclado e Touchpad</strong></td>
                  <td>Abra o Bloco de Notas e aperte todas as teclas de A a Z, Enter e setas. Deslize o dedo por todo o touchpad para ver se não pula.</td>
                </tr>
                <tr>
                  <td><strong>D. Tela</strong></td>
                  <td>Procure "Dead Pixel Test" no YouTube. Olhe em tela cheia (branca e preta) buscando manchas de pressão ou pontos pretos.</td>
                </tr>
                <tr>
                  <td><strong>E. Portas USB</strong></td>
                  <td>Abra e feche a tampa 3 vezes para sentir a dobradiça. Plugue um pendrive em todas as portas USB para testar leitura.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- CUIDADOS NA LOJA (FAQ) --- */}
        <section className="faq-section" style={{marginTop: '3rem', marginBottom: '3rem'}}>
          <div className="section-title" style={{ marginBottom: '1.5rem' }}>
            <span className="section-icon">🛡️</span> Como os caras tentam te enrolar na loja
          </div>
          
          <div className="faq-container">
            <details className="faq-item">
              <summary className="faq-question">🔌 O carregador precisa ser o original?</summary>
              <div className="faq-answer">
                <strong>Sim!</strong> Exija o carregador ORIGINAL da marca. Carregadores "paralelos" que eles tentam empurrar vão estragar a bateria a longo prazo. Se ele não tiver o original, peça um bom desconto pra comprar um por fora depois.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">💾 "Leva esse que tem 1 TERA de espaço"</summary>
              <div className="faq-answer">
                <strong>Não cai nessa!</strong> O vendedor vai tentar te dar um HD antigo e lerdo só porque ele tem 1 Tera de espaço. É mil vezes melhor levar o SSD de 512GB (que é absurdamente mais rápido) do que um HD gigante que vai fazer seu Word e CRM travarem na hora H.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">🧾 Posso sair só com o comprovante do cartão?</summary>
              <div className="faq-answer">
                <strong>Jamais.</strong> Exija um recibo com o CNPJ da loja escrito que você tem no mínimo <strong>3 meses de garantia</strong>. Mande o cara anotar o <strong>Número de Série</strong> do notebook (fica embaixo da máquina) nesse recibo. É sua única prova de compra.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">✨ Achei um risquinho na tampa, desisto?</summary>
              <div className="faq-answer">
                <strong>Fica tranquilo.</strong> Esses notes corporativos usados sempre têm um risquinho ou marca de adesivo na tampa, os caras usam eles de qualquer jeito nas empresas. O que importa mesmo é: a tela não pode ter manchas brancas e as teclas tem que estar todas funcionando macias.
              </div>
            </details>
          </div>
        </section>

        <div style={{ textAlign: 'center', marginTop: '3rem', color: '#9ca3af', fontSize: '0.9rem' }}>
            Montado com carinho e algumas pesquisas na madrugada ☕
        </div>
      </div>

      {/* --- MODAL DE DETALHES --- */}
      {selectedCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Header Fixo e área de arrasto */}
            <div 
              className="modal-header"
              onTouchStart={(e) => setTouchStartY(e.targetTouches[0].clientY)}
              onTouchMove={handleTouchMove}
            >
              <div className="drag-handle"></div>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>

            {/* Corpo com Scroll */}
            <div className="modal-scroll-body">
              <div className={`quick-pill ${selectedCard.pillClass}`} style={{marginBottom: '0.5rem'}}>{selectedCard.pillText}</div>
              <h2 className="modal-title">{selectedCard.title}</h2>
              <p className="modal-desc">{selectedCard.details.summary}</p>
              
              <div className="modal-grid">
                <div className="modal-pros">
                  <h4 className="modal-subtitle">✅ Excelente para:</h4>
                  <ul className="modal-list">
                    {selectedCard.details.goodFor.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
                <div className="modal-cons">
                  <h4 className="modal-subtitle">❌ Não serve para:</h4>
                  <ul className="modal-list">
                    {selectedCard.details.badFor.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Footer Fixo */}
            <div className="modal-footer">
              <a href={`https://www.google.com/search?q=${encodeURIComponent(selectedCard.searchQuery)}`} target="_blank" rel="noreferrer" className="btn-action btn-primary" style={{display: 'inline-flex', padding: '0.85rem 1.5rem', width: '100%', justifyContent: 'center', fontSize: '1.05rem', borderRadius: '10px'}}>
                <GoogleIcon /> Buscar este modelo no Google
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
