'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // 現在のURLのクエリパラメータを取得するフック
  const pathname = usePathname();// 現在のURLのパスを取得するフック
  const router = useRouter();
  const handleSearch = useDebouncedCallback((term) => { // クエリパラメータを更新する関数
    console.log('Searching... ${term}');

    const params = new URLSearchParams(searchParams); // 現在のパラメーターをコピーする
    params.set('page', '1');
    if (term) {
      params.set('query', term); // クエリパラメータに検索語をセットする
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`); // URLを更新する（ページ遷移はしない）
  },300); // 300msのデバウンスを設定する
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value); // inputに入力されるたびにURLのクエリパラメータを更新する
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
