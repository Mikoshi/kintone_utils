/**
 * hash_util.js
 *
 * SHA-256および2重SHA-256ハッシュを提供する共通ユーティリティ。
 * 他のスクリプトからwindow経由で利用可能。
 *
 * 提供関数：
 * - window.sha256(text): 単一SHA-256
 * - window.doubleSha256(text): 2重SHA-256
 *
 * 注意事項:
 * - jQuery不使用
 * - Kintoneカスタマイズ用にES Module構文を使わず、グローバル関数として定義
 *
 * 作成日: 2025-07-17
 * 作成者: mikoshi
 */

(function () {
  'use strict';

  // 単一SHA-256
  window.sha256 = async function (text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // 2重SHA-256
  window.doubleSha256 = async function (text) {
    const firstHash = await window.sha256(text);
    return await window.sha256(firstHash);
  };
})();
