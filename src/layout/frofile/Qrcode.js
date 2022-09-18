import React from 'react';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function QrCode() {
    const { member_id } = useParams();
    const link = process.env.REACT_APP_WEB;
    const [src, SetSrc] = useState('');
    useEffect(() => {
        QRCode.toDataURL(`${process.env.REACT_APP_WEB}/profile/${member_id}`)
            .then((url) => {
                SetSrc(url);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <img src={src} alt="test" width="800" height="800" />
        </div>
    );
}

export default QrCode;
