/* export default function cloudinaryLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  // نکته مهم: به جای کلمه demo باید نام اکانت (Cloud Name) خودتان را بنویسید
  const cloudName = "YOUR_CLOUD_NAME_HERE"; 
  
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}${src}`;
} */