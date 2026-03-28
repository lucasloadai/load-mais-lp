export const dddEmojis: Record<string, string> = {
  '11': '🎧',  // SP capital — balada, shows, agito
  '12': '🚀',  // Vale do Paraíba — Embraer, INPE, aeronáutica
  '13': '⚓',  // Santos — maior porto do Brasil
  '14': '🥪',  // Bauru — berço do famoso sanduíche bauru
  '15': '🎸',  // Sorocaba — capital do rock/metal interior SP
  '16': '🍊',  // Ribeirão Preto — agro, cana, dinheiro
  '17': '💃',  // Rio Preto — capital do forró e do axé SP
  '18': '🌱',  // Presidente Prudente — interior verde
  '19': '💡',  // Campinas — Unicamp, polo de inovação
  '21': '🌴',  // Rio de Janeiro — Cristo, Copacabana, carioca lifestyle
  '22': '🛢️',  // Campos — capital brasileira do petróleo
  '24': '⛰️',  // Serra fluminense — Petrópolis, montanha
  '27': '🦅',  // Vitória/ES — Espírito Santo, capital vibrante
  '28': '🎶',  // Cachoeiro — terra natal de Roberto Carlos
  '31': '🎸',  // BH — cena de rock e metal forte, Shows
  '32': '🏙️',  // Juiz de Fora — cidade cosmopolita de MG
  '33': '✈️',  // Gov. Valadares — famosa pela emigração aos EUA
  '34': '🚛',  // Uberlândia — hub logístico do triângulo mineiro
  '35': '☕',  // Sul de Minas — capital nacional do café
  '37': '🧵',  // Divinópolis — polo de confecção e moda
  '38': '🌵',  // Norte de Minas — sertão, resiliência
  '41': '❄️',  // Curitiba — meme nacional do frio
  '42': '🌾',  // Ponta Grossa — campos gerais, agro
  '43': '☕',  // Londrina — norte do Paraná, café
  '44': '🌸',  // Maringá — cidade planejada, "cidade jardim"
  '45': '💧',  // Foz do Iguaçu — Cataratas, turismo
  '46': '🌲',  // Sudoeste PR — natureza e trabalho
  '47': '🍺',  // Joinville/Blumenau — Oktoberfest, colonização alemã
  '48': '🏄',  // Florianópolis — surf, tech, Ilha da Magia
  '49': '🍗',  // Chapecó — agroindústria, BRF, frango
  '51': '🧉',  // Porto Alegre — chimarrão, identidade gaúcha
  '53': '🍬',  // Pelotas — famosa pelos doces artesanais
  '54': '🍷',  // Serra Gaúcha — capital brasileira do vinho
  '55': '🤠',  // Santa Maria — gauchismo, tradição
  '61': '🏛️',  // Brasília — poder, política, influência
  '62': '🎵',  // Goiânia — maior polo sertanejo do Brasil
  '63': '🌡️',  // Palmas — uma das cidades mais quentes do país
  '64': '🐂',  // Sul goiano — agronegócio forte
  '65': '🔥',  // Cuiabá — calor extremo + agro gigante
  '66': '🚜',  // Rondonópolis — logística e soja
  '67': '🐊',  // Campo Grande — Pantanal, natureza única
  '68': '🌳',  // Rio Branco/Acre — floresta, meme "o Acre existe"
  '69': '🌿',  // Porto Velho — Rondônia, Amazônia
  '71': '🥁',  // Salvador — axé, carnaval, Pelourinho
  '73': '🍫',  // Sul da Bahia — Ilhéus, cacau e chocolate
  '74': '🌵',  // Sertão baiano — resistência e força
  '75': '🎉',  // Feira de Santana — Micareta, maior fora de época
  '77': '🤠',  // Oeste baiano — agro e sertão
  '79': '🦀',  // Aracaju/SE — caranguejo, menor estado mas grande sabor
  '81': '🎭',  // Recife — frevo, carnaval, polo criativo
  '82': '🌊',  // Maceió — praias mais bonitas do Brasil
  '83': '☀️',  // João Pessoa — sol forte, cidade histórica
  '84': '🪂',  // Natal — Genipabu, buggy, dunas
  '85': '🏄',  // Fortaleza — surf, praia urbana, agito
  '86': '🌶️',  // Teresina — calor intenso, nordeste interior
  '87': '🌵',  // Sertão PE — Petrolina, força do sertão
  '88': '🎸',  // Cariri/CE — Luiz Gonzaga, forró raiz, cultura forte
  '89': '💎',  // Sul PI — Sete Cidades, riqueza escondida
  '91': '🥣',  // Belém — capital mundial do açaí
  '92': '🌿',  // Manaus — polo industrial na maior floresta
  '93': '🐬',  // Santarém — boto cor de rosa, rios amazônicos
  '94': '⛏️',  // Marabá — minério, ouro, Serra dos Carajás
  '95': '🦁',  // Boa Vista/RR — fronteira, diversidade, Monte Roraima
  '96': '⚽',  // Macapá — estádio Zerão na linha do Equador
  '97': '🐍',  // Interior AM — biodiversidade extrema
  '98': '🏖️',  // São Luís — Lençóis Maranhenses, patrimônio UNESCO
  '99': '🌾',  // Imperatriz/MA — interior crescendo
}

export function getDDDEmoji(ddd: string): string {
  return dddEmojis[ddd] ?? '📍'
}

export const dddMessages: Record<string, string> = {
  "11": "São Paulo nunca dorme. Sua empresa também não deveria parar de crescer.",
  "12": "Vale do Paraíba tem potencial enorme. Vamos escalar seu negócio juntos.",
  "13": "Santos é porta de entrada para o mundo. Hora da sua marca ganhar escala.",
  "14": "Interior paulista com garra. Vamos estruturar seu crescimento com método.",
  "15": "Sorocaba cresce todos os anos. Sua empresa pode crescer junto.",
  "16": "Ribeirão Preto, a capital do agronegócio. Vamos levar sua marca além.",
  "17": "São José do Rio Preto, referência em comércio. Hora de expandir.",
  "18": "Presidente Prudente tem visão de futuro. Vamos planejar o seu.",
  "19": "Campinas é polo de inovação. Sua empresa merece o mesmo ritmo.",
  "21": "Do Rio para o mundo. Hora da sua marca ganhar escala nacional.",
  "22": "Interior carioca tem força. Vamos estruturar seu crescimento.",
  "24": "Região serrana do Rio, potencial imenso. Vamos trabalhar juntos.",
  "27": "Espírito Santo cresce com consistência. Sua empresa pode ir junto.",
  "28": "Sul capixaba tem raízes fortes. Vamos fazer sua empresa crescer.",
  "31": "Minas é estratégica até no café. Vamos estruturar seu crescimento também?",
  "32": "Juiz de Fora, entre RJ e SP. Posição estratégica para crescer.",
  "33": "Minas Gerais, berço da estratégia. Vamos planejar seu futuro.",
  "34": "Triângulo Mineiro, entroncamento do Brasil. Sua empresa merece destaque.",
  "35": "Sul de Minas, qualidade e tradição. Hora de escalar.",
  "37": "Centro-Oeste mineiro com potencial real. Vamos estruturar juntos.",
  "38": "Norte de Minas crescendo forte. Hora de dar o próximo passo.",
  "41": "Curitiba é conhecida por planejamento. Sua empresa também pode crescer com método.",
  "42": "Ponta Grossa, coração do Paraná. Hora de expandir.",
  "43": "Londrina, metrópole do interior. Vamos escalar seu negócio.",
  "44": "Maringá, cidade planejada. Vamos planejar seu crescimento também.",
  "45": "Foz do Iguaçu, ponto de encontro de fronteiras. Vamos expandir sua marca.",
  "46": "Sudoeste paranaense, terra de trabalho. Vamos estruturar seu crescimento.",
  "47": "Joinville, capital industrial. Sua empresa merece o mesmo nível.",
  "48": "Florianópolis, hub de tecnologia. Vamos inovar juntos.",
  "49": "Oeste catarinense, força produtiva. Hora de escalar.",
  "51": "No Sul, estratégia vem antes da execução. Vamos estruturar seu crescimento.",
  "53": "Pelotas tem história e potencial. Vamos escrever o próximo capítulo.",
  "54": "Serra gaúcha, qualidade e inovação. Sua empresa merece o mesmo.",
  "55": "Santa Maria, no coração do RS. Vamos expandir daqui.",
  "61": "Brasília move o Brasil. Sua empresa pode mover o mercado.",
  "62": "Goiás lança música sertaneja pro mundo todo. Que tal lançar sua empresa pro futuro com IA?",
  "63": "Tocantins, o estado mais novo do Brasil. Novas oportunidades te esperam.",
  "64": "Rio Verde, capital do agronegócio goiano. Vamos escalar juntos.",
  "65": "Cuiabá, centro geográfico do Brasil. Posição perfeita para crescer.",
  "66": "Rondonópolis, polo logístico. Hora de expandir sua marca.",
  "67": "Campo Grande, capital do Pantanal. Vamos estruturar seu crescimento.",
  "68": "Acre, fartura e potencial. Hora de dar o próximo passo.",
  "69": "Rondônia cresce no mapa do Brasil. Sua empresa pode crescer junto.",
  "71": "Salvador, capital da cultura e negócios. Vamos levar sua marca além.",
  "73": "Sul da Bahia, potencial inexplorado. Vamos trabalhar juntos.",
  "74": "Feira de Santana, porta do sertão. Hora de expandir.",
  "75": "Interior baiano com força. Vamos estruturar seu crescimento.",
  "77": "Oeste baiano, terra do agronegócio. Vamos escalar juntos.",
  "79": "Sergipe, pequeno em tamanho, grande em oportunidades.",
  "81": "Recife, polo de inovação do Nordeste. Vamos crescer juntos.",
  "82": "Alagoas tem potencial real. Hora de estruturar seu crescimento.",
  "83": "Paraíba crescendo no mapa nacional. Vamos planejar juntos.",
  "84": "Natal, cidade do sol e dos negócios. Hora de expandir.",
  "85": "Fortaleza, hub de negócios do Nordeste. Vamos escalar sua empresa.",
  "86": "Piauí em ascensão. Hora de estruturar seu crescimento.",
  "87": "Sertão pernambucano com garra. Vamos trabalhar juntos.",
  "88": "Cariri cearense, força e potencial. Hora de crescer.",
  "89": "Sul do Piauí com visão de futuro. Vamos estruturar juntos.",
  "91": "Belém, metrópole da Amazônia. Vamos levar sua marca ao próximo nível.",
  "92": "Manaus, polo industrial do Norte. Hora de crescer com estratégia.",
  "93": "Santarém, coração da Amazônia. Vamos estruturar seu crescimento.",
  "94": "Marabá, polo logístico do Pará. Hora de expandir.",
  "95": "Roraima crescendo no mapa do Brasil. Vamos planejar juntos.",
  "96": "Amapá, riqueza natural e potencial. Hora de estruturar.",
  "97": "Interior amazonense com oportunidades únicas. Vamos trabalhar juntos.",
  "98": "São Luís, capital do Maranhão. Hora da sua marca ganhar escala.",
  "99": "Interior maranhense crescendo forte. Vamos estruturar juntos.",
}

export const defaultDDDMessage =
  "Seu negócio tem potencial. Vamos juntos estruturar o crescimento com inteligência e estratégia."

export function getDDDMessage(ddd: string): string {
  return dddMessages[ddd] ?? defaultDDDMessage
}
