(function () {

    const ckbxs = document.getElementsByClassName('persistCkbx');
    let saved = '';

    // 保存処理
    const ckbxStatus = Object.freeze({
        TRUE: "T",
        FALSE: "F"
    })
    function updateCkbxStatus() {

        const ckbxs = document.getElementsByClassName('persistCkbx');
        const status = Array(ckbxs.length);

        for ( let i = 0; i < ckbxs.length; i++ ) {
            if ( ckbxs[i].checked )
                status[i] = ckbxStatus.TRUE;
            else
                status[i] = ckbxStatus.FALSE;
        }
        const result = "".concat(...status);
        try { localStorage.setItem('checklist', result) } catch (e) {  }

    }

    // 値の取得
    try { saved = localStorage.getItem('checklist') || ''; } catch (e) {  }
    
    // チェックボックスの数が合わないなら初期化
    if ( saved.length !== ckbxs.length && saved !== '' ) {
        console.warn(`保存された情報とチェックボックスの数が合わないため、保存された情報を破棄します: ${saved}`);
        updateCkbxStatus()
        saved = ''
    }

    for (let i = 0; i < ckbxs.length; i++) {

        // 値の復元
        if ( saved && saved[i] === ckbxStatus.TRUE )
            ckbxs[i].checked = true;
        
        // 値の保存
        ckbxs[i].addEventListener('change', updateCkbxStatus)

    }

})()
