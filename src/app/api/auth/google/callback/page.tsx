'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleCallback() {
    const router = useRouter();

    useEffect(() => {
        const url = new URL(window.location.href);
        const accessToken = url.searchParams.get('access_token');
        const idToken = url.searchParams.get('id_token');
        console.log('ID Token', idToken);
        console.log('Access Token:', accessToken);
        if (accessToken) {
            // Gửi id_token đến API backend (Next.js route)
            fetch('http://localhost:1337/api/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ access_token: accessToken }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.jwt) {
                        console.log('✅ Đăng nhập thành công:', data);
                        // Lưu JWT nếu muốn
                        localStorage.setItem('token', data.jwt);
                        // Chuyển sang trang chính
                        console.log(localStorage.getItem('token'));
                        console.log('login success');
                        router.push('/user-info');
                    } else {
                        console.error('❌ Lỗi khi xác thực:', data);
                    }
                });
        }
    }, []);

    return <p>Đang xử lý đăng nhập...</p>;
}
