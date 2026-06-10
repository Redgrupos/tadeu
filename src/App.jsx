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
    details: {
      summary: "O T490 é a evolução direta do T480. Ele é um pouco mais fino, leve e traz processadores mais recentes, mantendo o excelente teclado da linha ThinkPad.",
      goodFor: ["Multitarefa pesada (Muitas abas abertas)", "Planilhas complexas no Excel", "Apresentações e uso de CRMs web", "Uso corporativo intenso diário"],
      badFor: ["Jogos modernos ou pesados", "Edição de vídeo em 4K", "Renderização 3D complexa"]
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
    details: {
      summary: "Conhecido como o 'tanque de guerra' corporativo. É uma máquina extremamente robusta, muito fácil de dar manutenção e trocar peças.",
      goodFor: ["Estudos e rotinas de escritório", "Trabalhos longos de digitação", "Pessoas desastradas (muito resistente)"],
      badFor: ["Jogos pesados", "Quem busca design muito fino ou moderno"]
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
    details: {
      summary: "A linha EliteBook da HP tem um acabamento impecável em alumínio que lembra os MacBooks. É leve, elegante e tem uma tela de muita qualidade.",
      goodFor: ["Reuniões com clientes (Visual Premium)", "Transporte constante (Mochila)", "Longas horas de tela (Anti-reflexo)"],
      badFor: ["Jogos pesados", "Ambientes de poeira ou sujeira (arranha mais fácil que plástico)"]
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
    details: {
      summary: "O 5490 é a escolha segura para economizar. Não é a máquina mais bonita ou fina, mas seu processador e memória entregam a mesma velocidade das outras.",
      goodFor: ["Orçamentos curtos", "Uso básico a intermediário (Word, Excel, Web)", "Escritórios fixos (Pouco transporte)"],
      badFor: ["Jogos", "Quem se importa com design premium"]
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
    details: {
      summary: "O diferencial aqui é o tamanho: tem tela de 13 polegadas, bordas finíssimas e material resistente. Quase não se sente o peso dele na bolsa.",
      goodFor: ["Levar em voos e viagens curtas", "Transporte urbano diário de transporte público", "Vendedores externos"],
      badFor: ["Pessoas com visão ruim (tela menor)", "Uso 100% fixo na mesa sem monitor externo"]
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
            Guia de Aquisição de Notebook
          </h1>
          <div className="context-box" style={{backgroundColor: '#f3f4f6', padding: '1.25rem', borderRadius: '10px', color: '#374151'}}>
            <p>Para ChatGPT, Gamma, PowerPoint, Excel, CRM, Canva e projetos da TS, os equipamentos abaixo com <strong>16 GB RAM</strong> e <strong>SSD 512 GB</strong> entregam uma excelente experiência para multitarefas em 2026.</p>
          </div>
        </section>

        {/* Modelos Recomendados */}
        <section className="quick-guide-section" style={{marginBottom: '3rem'}}>
          <h2 className="section-title">Modelos Recomendados</h2>
          <p style={{marginBottom: '1.5rem', color: '#4b5563'}}>Abaixo estão as opções de compra prioritárias para o seu perfil.</p>
          
          <div className="quick-cards-grid">
            {quickCards.map((card) => (
              <div key={card.id} className={`quick-card ${card.cardClass}`}>
                <div className={`quick-pill ${card.pillClass}`}>{card.pillText}</div>
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
            <h3 className="aux-card-title danger-text">🚨 Modelos para Evitar</h3>
            <ul className="aux-list">
              <li>Processadores <strong>Celeron</strong> ou <strong>Pentium</strong>.</li>
              <li>Intel Core <strong>i3 antigos</strong>.</li>
              <li>Apenas <strong>8 GB de RAM</strong> (Vai travar seu CRM).</li>
              <li><strong>HD mecânico</strong> sem SSD (Lentidão extrema).</li>
              <li>Tela HD 1366x768 (Imagem embaçada, exige-se Full HD).</li>
            </ul>
          </div>

          <div className="aux-card tips-card">
            <h3 className="aux-card-title">💡 Dicas antes de comprar</h3>
            <ul className="aux-list">
              <li>Peça fotos reais da tela e do teclado: desgaste indica uso pesado.</li>
              <li>Confira a saúde da bateria: acima de 75% é o ideal.</li>
              <li>Verifique se o SSD é NVMe: mais rápido que SATA.</li>
              <li>Evite anúncios sem informar a geração do processador.</li>
              <li>Prefira vendedores com nota alta e garantia.</li>
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
          <h2 className="section-title">Como abordar o vendedor</h2>
          <div className="phrase-card">
            <p className="phrase-text">
              "Estou procurando um notebook corporativo, i5 de 8ª geração ou superior, 16 GB RAM, SSD 512 GB e tela Full HD. Tenho até R$ 2.500."
            </p>
          </div>
        </section>

        {/* Protocolo de Validação */}
        <section className="checklist-section">
          <div className="protocol-card">
            <h2 className="section-title" style={{marginBottom: '0.5rem'}}>Protocolo de Validação na Loja</h2>
            <p style={{marginBottom: '1.5rem', color: '#4b5563', fontSize: '0.95rem'}}>
              Siga estes testes na mesa do vendedor antes de efetuar o pagamento.
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
