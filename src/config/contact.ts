export const CONTACT_INFO = {
  phoneDisplay: '+91 77175 58707',
  phoneTel: '+917717558707',
  whatsappRaw: '917717558707',
  whatsappDisplay: '+91 77175 58707',
  getWhatsappUrl: (text = '') => {
    const encoded = text ? `?text=${encodeURIComponent(text)}` : '';
    return `https://wa.me/917717558707${encoded}`;
  },
  email: 'shalom@eventswithshalom.com',
};
